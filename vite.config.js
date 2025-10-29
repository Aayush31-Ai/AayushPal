import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),  tailwindcss(),],
  server: {
    host: true,       // 👈 "0.0.0.0" ya true dono chalega
    port: 5173,
    strictPort: true, // optional but avoids auto port shift
  },

})
