import { VitePWA } from "vite-plugin-pwa";

// https://vite-pwa-org.netlify.app
export default function setupVitePwa(viteEnv: Env.ImportMeta) {
  return VitePWA({
    registerType: "autoUpdate",
    includeAssets: ["favicon.ico"],
    manifest: {
      name: viteEnv.VITE_APP_NAME,
      short_name: viteEnv.VITE_APP_NAME,
      theme_color: "#fff",
      icons: [
        {
          src: "/logo.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/logo.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "/logo.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable",
        },
      ],
    },
  });
}
