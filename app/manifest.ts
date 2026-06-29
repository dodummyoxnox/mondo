/**
 * PWA Manifest Configuration untuk Android/TWA
 * PWA_ANDROID_SAFE_BLOCK_START
 */

export const manifest = {
  name: "Mondo - Belajar Bahasa Jepang",
  short_name: "Mondo",
  start_url: "/",
  scope: "/",
  display: "standalone",
  background_color: "#020617",
  theme_color: "#2563eb",
  orientation: "portrait",
  icons: [
    {
      src: "/logo.jpg",
      sizes: "512x512",
      type: "image/jpeg",
      purpose: "any",
    },
    {
      src: "/logo.jpg",
      sizes: "512x512",
      type: "image/jpeg",
      purpose: "maskable",
    },
  ],
}

/**
 * PWA_ANDROID_SAFE_BLOCK_END
 */
