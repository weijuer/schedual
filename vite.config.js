import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// https://juejin.cn/post/7012446423367024676
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import {
  NaiveUiResolver,
  AntDesignVueResolver,
} from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      // 自己组件
      dirs: ['src/components'],
      extensions: ['vue'],
      // UI库
      resolvers: [AntDesignVueResolver(), NaiveUiResolver()],
    }),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
    }),
  ],
})
