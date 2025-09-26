import fs from 'fs'
import * as path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import NodeGlobalsPolyfillPlugin from '@esbuild-plugins/node-globals-polyfill'
import nodePolyfills from 'vite-plugin-node-polyfills'

export default () => {
  return defineConfig({
    plugins: [
      react(),
      nodePolyfills({
        protocolImports: true // allows "node:url", "node:crypto", etc.
      })
    ],
    define: {
      global: 'globalThis'
    },
    server: {
      port: 3004,
      proxy: 'http://localhost:3004',
      cors: {
        origin: ['http://localhost:3004'],
        methods: ['GET', 'PATCH', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          includePaths: ['node_modules', './src/assets']
        }
      },
      postcss: {
        plugins: [require('postcss-rtl')()]
      }
    },
    resolve: {
      alias: [
        {
          find: /^~.+/,
          replacement: val => val.replace(/^~/, '')
        },
        { find: 'stream', replacement: 'stream-browserify' },
        { find: 'crypto', replacement: 'crypto-browserify' },
        { find: '@src', replacement: path.resolve(__dirname, 'src') },
        { find: '@store', replacement: path.resolve(__dirname, 'src/redux') },
        { find: '@configs', replacement: path.resolve(__dirname, 'src/configs') },
        { find: '@styles', replacement: path.resolve(__dirname, 'src/@core/scss') },
        { find: '@utils', replacement: path.resolve(__dirname, 'src/utility/Utils') },
        { find: '@hooks', replacement: path.resolve(__dirname, 'src/utility/hooks') },
        { find: '@assets', replacement: path.resolve(__dirname, 'src/@core/assets') },
        { find: '@layouts', replacement: path.resolve(__dirname, 'src/@core/layouts') },
        { find: '@components', replacement: path.resolve(__dirname, 'src/@core/components') }
      ]
    },
    esbuild: {
      loader: 'jsx',
      include: /.\/src\/.*\.js?$/,
      exclude: [],
      jsx: 'automatic'
    },
    optimizeDeps: {
      esbuildOptions: {
        loader: {
          '.js': 'jsx'
        },
        plugins: [
          NodeGlobalsPolyfillPlugin({
            buffer: true,
            process: true
          }),
          {
            name: 'load-js-files-as-jsx',
            setup(build) {
              build.onLoad({ filter: /src\\.*\.js$/ }, async args => ({
                loader: 'jsx',
                contents: await fs.readFileSync(args.path, 'utf8')
              }))
            }
          }
        ]
      }
    }
  })
}
