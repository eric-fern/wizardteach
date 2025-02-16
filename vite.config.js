import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
    plugins: [vue()],
    root: 'src',
    publicDir: '../public',
    server: {
        port: 3000,
        open: true
    },
    build: {
        outDir: '../dist',
        emptyOutDir: true,
        rollupOptions: {
            external: [],
            output: {
                manualChunks: undefined
            }
        }
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src/js'),
            '~': path.resolve(__dirname, './src')
        }
    }
}); 