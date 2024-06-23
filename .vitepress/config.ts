import {defineConfig} from "vitepress"
import {wordless} from "../index"

export default defineConfig({
  markdown: {
    config(md) {
      md.use(wordless)
    },
  },
  title: "Markdown-it Wordless",
  base: "./",
  themeConfig: {
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/treeinfra/markdown-it-wordless",
      },
    ],
  },
  locales: {
    root: {label: "English", lang: "en", link: "/docs"},
    zh: {
      label: "简体中文",
      lang: "zh",
      link: "/docs/zh",
      themeConfig: {
        outline: {label: "目录"},
      },
    },
  },
})
