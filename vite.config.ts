import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // GitHub Pages project site: https://pewzpewz.github.io/samira-piano/
  base: process.env.GITHUB_PAGES === '1' ? '/samira-piano/' : '/',
  plugins: [react()],
  server: {
    watch: {
      // Windows locks newly written MP3s; don't FS-watch sample packs
      ignored: ['**/public/audio/**'],
    },
  },
})
