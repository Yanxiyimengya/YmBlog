import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import type { App } from 'vue'
import Layout from './Layout.vue'
import MarkdownImageViewer from './components/MarkdownImageViewer.vue'
import 'tdesign-vue-next/es/image-viewer/style/index.css'
import './css/style.css'
import './css/dark.css'
import './css/light.css'
import 'katex/dist/katex.min.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }: { app: App }) {
    app.component('MarkdownImageViewer', MarkdownImageViewer)
  }
} satisfies Theme
