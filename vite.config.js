import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
     tailwindcss(),
    react(),
  ],
  server: {
    port: 5174, // 👈 change this to your desired port
  },
})
