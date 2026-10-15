import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      // Windows locks newly written MP3s; don't FS-watch sample packs
      ignored: ['**/public/audio/**'],
    },
  },
})
