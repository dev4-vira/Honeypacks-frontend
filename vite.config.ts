import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // The preserved v1 PostCSS configuration is not used by the imported storefront.
  css: { postcss: { plugins: [] } },
})
