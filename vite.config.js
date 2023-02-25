import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  plugins: [react()],
  server: {
    port: 8000,
    strictPort: true, //  Set to true to exit if port is already in use
    host: '127.0.0.1',
    open: 'http://127.0.0.1:8000',
  },
})
