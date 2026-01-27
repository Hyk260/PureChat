import { describe, expect, it } from "vitest"
import { linkifyUrls, hasLink, isValidUrl, linkifySegment, MENTION_REGEX } from "../linkifyUrls"
import atUserList from "./atUserList.json"

describe("linkifyUrls utilities", () => {
  describe("linkifyUrls", () => {
    it("should return empty string for empty input", () => {
      expect(linkifyUrls("")).toBe("")
    })

    it("should return original text when no URLs are present", () => {
      const text = "This is a test without any URLs"
      expect(linkifyUrls(text)).toBe(text)
    })

    it("should convert HTTP URL to clickable link", () => {
      const text = "Check out http://example.com"
      const expected = 'Check out <a href="http://example.com" class="linkUrl" target="_blank">http://example.com</a>'
      expect(linkifyUrls(text)).toBe(expected)
    })

    it("should convert HTTPS URL to clickable link", () => {
      const text = "Check out https://example.com"
      const expected = 'Check out <a href="https://example.com" class="linkUrl" target="_blank">https://example.com</a>'
      expect(linkifyUrls(text)).toBe(expected)
    })

    it("should handle multiple URLs in one text", () => {
      const text = "Check out http://example.com and https://google.com"
      const expected =
        'Check out <a href="http://example.com" class="linkUrl" target="_blank">http://example.com</a> and <a href="https://google.com" class="linkUrl" target="_blank">https://google.com</a>'
      expect(linkifyUrls(text)).toBe(expected)
    })

    it("should respect custom options", () => {
      const text = "Check out https://example.com"
      const options = { target: "_self", className: "custom-link" }
      const expected =
        'Check out <a href="https://example.com" class="custom-link" target="_self">https://example.com</a>'
      expect(linkifyUrls(text, options)).toBe(expected)
    })

    it("should not convert truncated URLs", () => {
      const text = "Check out https://example.com..."
      expect(linkifyUrls(text)).toBe(text)
    })

    it("should not convert URLs followed by ellipsis", () => {
      const text = "Check out https://example.com…"
      expect(linkifyUrls(text)).toBe(text)
    })

    it("should handle URLs with paths", () => {
      const text = "Check out https://example.com/path/to/page"
      const expected =
        'Check out <a href="https://example.com/path/to/page" class="linkUrl" target="_blank">https://example.com/path/to/page</a>'
      expect(linkifyUrls(text)).toBe(expected)
    })

    it("should handle URLs with query parameters", () => {
      const text = "Check out https://example.com/search?q=test"
      const expected =
        'Check out <a href="https://example.com/search?q=test" class="linkUrl" target="_blank">https://example.com/search?q=test</a>'
      expect(linkifyUrls(text)).toBe(expected)
    })

    it("should handle URLs with hash fragments", () => {
      const text = "Check out https://example.com/page#section"
      const expected =
        'Check out <a href="https://example.com/page#section" class="linkUrl" target="_blank">https://example.com/page#section</a>'
      expect(linkifyUrls(text)).toBe(expected)
    })
  })

  describe("hasLink", () => {
    it("should return false for empty input", () => {
      expect(hasLink("")).toBe(false)
    })

    it("should return false when no URLs are present", () => {
      expect(hasLink("This is a test without any URLs")).toBe(false)
    })

    it("should return true when HTTP URL is present", () => {
      expect(hasLink("Check out http://example.com")).toBe(true)
    })

    it("should return true when HTTPS URL is present", () => {
      expect(hasLink("Check out https://example.com")).toBe(true)
    })

    it("should return true when multiple URLs are present", () => {
      expect(hasLink("Check out http://example.com and https://google.com")).toBe(true)
    })
  })

  describe("isValidUrl", () => {
    it("should return false for empty input", () => {
      expect(isValidUrl("")).toBe(false)
    })

    it("should return true for valid HTTP URL", () => {
      expect(isValidUrl("http://example.com")).toBe(true)
    })

    it("should return true for valid HTTPS URL", () => {
      expect(isValidUrl("https://example.com")).toBe(true)
    })

    it("should return true for valid FTP URL", () => {
      expect(isValidUrl("ftp://example.com")).toBe(true)
    })

    it("should return false for URL without protocol", () => {
      expect(isValidUrl("example.com")).toBe(false)
    })

    it("should return false for invalid protocol", () => {
      expect(isValidUrl("invalid://example.com")).toBe(false)
    })

    it("should return true for URL with path", () => {
      expect(isValidUrl("https://example.com/path")).toBe(true)
    })

    it("should return true for URL with query parameters", () => {
      expect(isValidUrl("https://example.com?param=value")).toBe(true)
    })
  })

  describe("linkifySegment", () => {

    it("should return empty array for empty input", () => {
      expect(linkifySegment("", [])).toEqual([])
    })

    it("should return text segment when no URLs or mentions are present", () => {
      const text = "This is a test without any links or mentions"
      const expected = [{ content: text, type: "text", isLink: false }]
      expect(linkifySegment(text, [])).toEqual(expected)
    })

    it("should identify URL segments", () => {
      const text = "Check out https://example.com"
      const expected = [
        { content: "Check out ", type: "text", isLink: false },
        { content: "https://example.com", type: "link", isLink: true, url: "https://example.com" },
      ]
      expect(linkifySegment(text, [])).toEqual(expected)
    })

    it("should identify mention segments when user exists", () => {
      const text = "Hello @PureChat"
      const result = linkifySegment(text, atUserList)
      expect(result).toHaveLength(2)
      expect(result[0]).toEqual({ content: "Hello ", type: "text", isLink: false })
      expect(result[1]).toEqual({
        content: "@PureChat",
        type: "mention",
        isLink: false,
        member: atUserList[0],
      })
    })

    it("should identify Chinese nickname mention segments when user exists", () => {
      const text = "Hello @张爱玲"
      const result = linkifySegment(text, atUserList)
      expect(result).toHaveLength(2)
      expect(result[0]).toEqual({ content: "Hello ", type: "text", isLink: false })
      expect(result[1]).toEqual({
        content: "@张爱玲",
        type: "mention",
        isLink: false,
        member: atUserList[1],
      })
    })

    //  @角色IP-贾维斯  @张爱玲 https://fanyi.baidu.com
    it("should handle mixed content with non-existent mention, existing mention, and URL", () => {
      const text = "@角色IP-贾维斯 @张爱玲 https://fanyi.baidu.com"
      const result = linkifySegment(text, atUserList)
      expect(result).toHaveLength(5)
      expect(result[0]).toEqual({ content: "@角色IP-贾维斯", type: "text", isLink: false })
      expect(result[1]).toEqual({ content: " ", type: "text", isLink: false })
      expect(result[2]).toEqual({
        content: "@张爱玲",
        type: "mention",
        isLink: false,
        member: atUserList[1],
      })
      expect(result[3]).toEqual({ content: " ", type: "text", isLink: false })
      expect(result[4]).toEqual({
        content: "https://fanyi.baidu.com",
        type: "link",
        isLink: true,
        url: "https://fanyi.baidu.com",
      })
    })

    it("should treat non-existent mentions as text", () => {
      const text = "Hello @nonExistentUser"
      const expected = [
        { content: "Hello ", type: "text", isLink: false },
        { content: "@nonExistentUser", type: "text", isLink: false },
      ]
      expect(linkifySegment(text, atUserList)).toEqual(expected)
    })

    it("should handle mixed content (text, URLs, mentions)", () => {
      const text = "Check out https://example.com and @PureChat"
      const result = linkifySegment(text, atUserList)
      expect(result).toHaveLength(4)
      expect(result[0]).toEqual({ content: "Check out ", type: "text", isLink: false })
      expect(result[1]).toEqual({
        content: "https://example.com",
        type: "link",
        isLink: true,
        url: "https://example.com",
      })
      expect(result[2]).toEqual({ content: " and ", type: "text", isLink: false })
      expect(result[3]).toEqual({
        content: "@PureChat",
        type: "mention",
        isLink: false,
        member: atUserList[0],
      })
    })

    it("should work without atUserList", () => {
      const text = "Check out https://example.com and @user1"
      const expected = [
        { content: "Check out ", type: "text", isLink: false },
        { content: "https://example.com", type: "link", isLink: true, url: "https://example.com" },
        { content: " and @user1", type: "text", isLink: false },
      ]
      expect(linkifySegment(text, [])).toEqual(expected)
    })
  })

  describe("MENTION_REGEX", () => {
    it("should match @mentions", () => {
      const text = "Hello @user1, how are you @user2?"
      const matches = text.match(MENTION_REGEX)
      expect(matches).toEqual(["@user1", "@user2"])
    })

    it("should not match @ without username", () => {
      const text = "Hello @, how are you?"
      const matches = text.match(MENTION_REGEX)
      expect(matches).toBe(null)
    })

    it("should stop at whitespace", () => {
      const text = "Hello @user1 how are you?"
      const matches = text.match(MENTION_REGEX)
      expect(matches).toEqual(["@user1"])
    })
  })
})
