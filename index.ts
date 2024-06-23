import md from "markdown-it"
import MarkdownIt from "markdown-it/index.mjs"

import type {Options} from "./data"
import {langIndexOf} from "./data"

export * from "./data"

/**
 * A markdown-it plugin to optimize wordless multi-language line-break render.
 * See [readme](./README.md) of this package for more details.
 * Here's the minimal examples on how to use it:
 *
 * ```ts
 * import md from "markdown-it"
 * import {wordless} from 'markdown-it-wordless'
 * md.use(wordless)
 * ```
 *
 * ## For VitePress users
 *
 * If you are using [VitePress](https://vitepress.dev),
 * you may config like this:
 *
 * ```ts
 * // <root>/.vitepress/config.ts
 * import {defineConfig} from "vitepress"
 * import {wordless} from "markdown-it-wordless"
 *
 * export default defineConfig({
 *   markdown: {
 *     config(md) {
 *       md.use(wordless)
 *     },
 *   },
 *   // Other configs...
 * })
 * ```
 */
export function wordless(md: md, options?: Options) {
  md.renderer.rules.softbreak = function (tokens, index) {
    if (index === 0 || index === tokens.length - 1) return " "
    const prefix = tokens[index - 1].content
    const suffix = tokens[index + 1].content
    const before = langIndexOf(prefix.charCodeAt(prefix.length - 1), options)
    const after = langIndexOf(suffix.charCodeAt(0), options)

    if (before === after && before >= 0) return "" // Same wordless language.
    if (before === -3 || after === -3) return "" // Special punctuations.
    if ((before === -2 && after >= 0) || (after === -2 && before >= 0))
      return "" // Resolve emoji.

    return " "
  }
}

if (import.meta.vitest) {
  const {expect, test} = import.meta.vitest

  test("basic function", function () {
    const raw = "English\nにほんご\n中文\n中文\nབོད་ཡིག།\nབོད་ཡིག།"
    expect(new MarkdownIt().use(wordless).render(raw)).toBe(
      "<p>English にほんご中文中文 བོད་ཡིག།བོད་ཡིག།</p>\n",
    )
  })

  test("zh,jp punctuations", function () {
    const raw = "全角符号，\n全角記号。\nぜんかくきごう"
    expect(new MarkdownIt().use(wordless).render(raw)).toBe(
      "<p>全角符号，全角記号。ぜんかくきごう</p>\n",
    )
  })
}
