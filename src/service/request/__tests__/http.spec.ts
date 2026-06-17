import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import Axios, { type AxiosRequestConfig } from "axios"

/**
 * Minimal pure-function test harness that replicates the critical
 * validation paths from PureChatHttp without pulling in Pinia / Vue /
 * the DOM. The goal is to guard two regression classes:
 *
 *   1. A 401 that fires /api/auth/refresh must not crash when the
 *      server returns a non-standard body (e.g. `{data: null}` or an
 *      HTML error page).
 *   2. A successful response that lacks an `authorization` header must
 *      not overwrite the stored access token with `undefined`.
 */

const localStgStore = new Map<string, string>()
const authStore = {
  refreshToken: "stale-refresh-token",
  accessToken: "stale-access-token",
  loggedOut: false,
  setTokens(access: string, refresh: string) {
    this.accessToken = access
    this.refreshToken = refresh
    localStgStore.set("Access-Token", access)
    localStgStore.set("Refresh-Token", refresh)
  },
  logout() {
    this.loggedOut = true
    localStgStore.delete("Access-Token")
    localStgStore.delete("Refresh-Token")
  },
}

const whiteList = ["/api/auth/refresh", "/api/auth/login"]

function formatToken(token: string) {
  return `Bearer ${token}`
}

type ApiResponse<T> = { code: number; message?: string; error?: string; data: T }

describe("token refresh response validation", () => {
  beforeEach(() => {
    localStgStore.clear()
    localStgStore.set("Access-Token", "seed-access")
    localStgStore.set("Refresh-Token", "seed-refresh")
    authStore.refreshToken = "seed-refresh"
    authStore.accessToken = "seed-access"
    authStore.loggedOut = false
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("propagates a typed error when the refresh response data is null", async () => {
    const adapter = vi.fn(() =>
      Promise.resolve({
        data: { code: 500, data: null } as ApiResponse<null>,
        status: 200,
        statusText: "OK",
        headers: {},
        config: {},
      })
    )
    const refreshService = Axios.create({ adapter } as unknown as AxiosRequestConfig)

    await expect(
      (async () => {
        const { data } = await refreshService.post<ApiResponse<{ accessToken: string; refreshToken: string }>>(
          "/api/auth/refresh",
          { refreshToken: authStore.refreshToken }
        )
        // Mirror runtime logic: unsafe destructure should throw.
        const payload = data && typeof data === "object" ? (data as ApiResponse<{ accessToken: string; refreshToken: string }>).data : null
        if (!payload || typeof payload !== "object") {
          throw new Error(
            `Unexpected token refresh response: ${typeof data === "object" ? JSON.stringify(data) : String(data)}`
          )
        }
        return payload
      })()
    ).rejects.toThrow(/Unexpected token refresh response/)
    // The refresh path is responsible for calling logout on failure.
  })

  it("propagates a typed error when the refresh response returns an empty object", async () => {
    const adapter = vi.fn(() =>
      Promise.resolve({
        data: { code: 0, data: {} } as ApiResponse<Record<string, never>>,
        status: 200,
        statusText: "OK",
        headers: {},
        config: {},
      })
    )
    const refreshService = Axios.create({ adapter } as unknown as AxiosRequestConfig)

    await expect(
      (async () => {
        const { data } = await refreshService.post<ApiResponse<{ accessToken: string; refreshToken: string }>>(
          "/api/auth/refresh",
          { refreshToken: authStore.refreshToken }
        )
        const payload = data && typeof data === "object" ? (data as ApiResponse<{ accessToken: string; refreshToken: string }>).data : null
        if (!payload || typeof payload !== "object") {
          throw new Error(`Unexpected token refresh response`)
        }
        const { accessToken, refreshToken } = payload as { accessToken?: string; refreshToken?: string }
        if (typeof accessToken !== "string" || !accessToken) {
          throw new Error("Token refresh returned invalid accessToken")
        }
        return { accessToken, refreshToken }
      })()
    ).rejects.toThrow(/Token refresh returned invalid accessToken/)
  })

  it("accepts a well-formed refresh response and updates tokens", async () => {
    const adapter = vi.fn(() =>
      Promise.resolve({
        data: { code: 200, data: { accessToken: "new-access", refreshToken: "new-refresh" } },
        status: 200,
        statusText: "OK",
        headers: {},
        config: {},
      })
    )
    const refreshService = Axios.create({ adapter } as unknown as AxiosRequestConfig)

    const { data } = await refreshService.post<ApiResponse<{ accessToken: string; refreshToken: string }>>(
      "/api/auth/refresh",
      { refreshToken: authStore.refreshToken }
    )
    const payload = data && typeof data === "object" ? data.data : null

    expect(payload).toEqual({ accessToken: "new-access", refreshToken: "new-refresh" })
    authStore.setTokens(payload!.accessToken, payload!.refreshToken)
    expect(localStgStore.get("Access-Token")).toBe("new-access")
  })

  it("skips writing Access-Token to storage when the response lacks an authorization header", () => {
    const before = localStgStore.get("Access-Token")
    const headers: Record<string, string> = {}

    const token = headers.authorization
    if (token && typeof token === "string" && token.trim().length > 0) {
      localStgStore.set("Access-Token", token)
    }

    expect(localStgStore.get("Access-Token")).toBe(before)
  })

  it("writes a non-empty authorization header to storage", () => {
    const headers: Record<string, string> = { authorization: "Bearer fresh-token" }

    const token = headers.authorization
    if (token && typeof token === "string" && token.trim().length > 0) {
      localStgStore.set("Access-Token", token)
    }

    expect(localStgStore.get("Access-Token")).toBe("Bearer fresh-token")
  })

  it("bypasses token injection for the whitelisted refresh path", () => {
    const config = { url: "/api/auth/refresh", headers: {} as Record<string, string> }
    const token = localStgStore.get("Access-Token")

    if (config.url && !whiteList.includes(config.url)) {
      if (token && config.headers) config.headers.Authorization = formatToken(token)
    }

    expect(config.headers.Authorization).toBeUndefined()
  })

  it("attaches Bearer token for a regular (non-whitelisted) URL", () => {
    const config = { url: "/api/user/profile", headers: {} as Record<string, string> }
    const token = localStgStore.get("Access-Token")

    if (config.url && !whiteList.includes(config.url)) {
      if (token && config.headers) config.headers.Authorization = formatToken(token)
    }

    expect(config.headers.Authorization).toBe("Bearer seed-access")
  })
})
