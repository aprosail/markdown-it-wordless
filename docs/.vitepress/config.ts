import {defineConfig} from "vitepress"
import {wordless} from "../../index"

export default defineConfig({
  markdown: {
    config(md) {
      md.use(wordless)
    },
  },
  title: "Markdown-it Wordless",
  base: "/markdown-it-wordless",
  themeConfig: {
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/treeinfra/markdown-it-wordless",
      },
    ],
  },
  locales: {
    root: {label: "English", lang: "en"},
    zh: {
      label: "简体中文",
      lang: "zh",
      link: "/zh",
      themeConfig: {
        outline: {label: "目录"},
      },
    },
  },
})
