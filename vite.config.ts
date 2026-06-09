import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import netlify from '@netlify/vite-plugin-tanstack-start'
import tsconfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tsconfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tanstackStart(),
    netlify(),
    react(),
    tailwindcss(),
  ],
})