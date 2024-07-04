export const isWindows = process.platform === "win32";
export const isMac = process.platform === "darwin";
export const isDevelopment = process.env.NODE_ENV === "development";
export const isProduction = process.env.NODE_ENV === "production";

export const electronRendererUrl = process.env['ELECTRON_RENDERER_URL']