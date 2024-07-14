import { URL, fileURLToPath } from 'node:url'
import path from 'node:path'
import process from 'node:process'
import fs from 'node:fs'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueDevTools from 'vite-plugin-vue-devtools'
import UnoCSS from 'unocss/vite'
import Layouts from 'vite-plugin-vue-layouts'
import Pages from 'vite-plugin-pages'
import VueRouter from 'unplugin-vue-router/vite'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

/**
 * A function that checks if the given ID includes 'element-plus/dist/locale' and filters locales based on the basename.
 *
 * @param {string} id - The ID to check for 'element-plus/dist/locale'
 * @return {boolean} Whether to include or exclude locales based on the basename, when false, include it
/**
 * A function that checks if the given ID includes 'element-plus/dist/locale' and filters locales based on the basename.
 *
 * @param {string} id - The ID to check for 'element-plus/dist/locale'
 * @returns {boolean} Whether to include or exclude locales based on the basename, when false, include it
 */
function externalElementPlusLocales(id: string): boolean {
  const localesDir: string = path.resolve(__dirname, 'locales')
  const localesFiles: string[] = fs.readdirSync(localesDir)
    ?.map((file: string): string => file.match(/([\w-]*)\.json$/)?.[1] ?? '') ?? []
  if (id.includes('element-plus/dist/locale')) {
    const basename: string = path.basename(id, '.mjs')
    // include locales files and exclude others
    return !localesFiles.some((o: string) => o.toLowerCase() === basename)
  }
  return false
}
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      external: id => externalElementPlusLocales(id),
    },
  },
  server: {
    port: 4210,
  },
  plugins: [
    VueRouter({
      extensions: ['.vue', '.md'],
      dts: 'src/typed-router.d.ts',
    }), // VueRouter must be placed before Vue
    vue(),
    Pages({
      dirs: [{ dir: 'src/pages', baseRoute: '' }],
      exclude: ['**/*.js', '**/components/*.vue'],
    }),
    Layouts({
      layoutsDirs: 'src/layouts', // layout file存放目录
      pagesDirs: 'src/pages',
      defaultLayout: 'default', // 对应src/layouts/default.vue
    }),
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: 'src/components.d.ts',
      directoryAsNamespace: false,
      resolvers: [ElementPlusResolver()],
    }),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      imports: [
        'vue',
        '@vueuse/core',
        '@vueuse/head',
        '@vueuse/math',
        VueRouterAutoImports,
        {
          'vue-router/auto': ['useLink'],
        },
      ],
      dts: 'src/auto-imports.d.ts',
      dirs: ['src/composables', 'src/stores'], // Auto import for module exports under directories
      vueTemplate: true, // Auto import inside Vue template
      resolvers: [ElementPlusResolver()],
    }),
    vueJsx(),
    VueDevTools(),
    UnoCSS(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons/svg')],
      symbolId: 'icon-[dir]-[name]',
    }),
    VueI18nPlugin({
      include: path.resolve(__dirname, './locales/**'),
      compositionOnly: true, // the legacy in modules/i18n is false, so forbid to change default language
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
