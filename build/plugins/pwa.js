import { VitePWA } from "vite-plugin-pwa";

export default function setupVitePwa() {
  return VitePWA({
    registerType: "autoUpdate",
    includeAssets: ["favicon.ico"],
    manifest: {
      name: "PureChat",
      short_name: "PureChat",
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
