import md from "markdown-it"
import MarkdownIt from "markdown-it/index.mjs"

import type {Options} from "./data"
import {langIndexOf} from "./data"

export * from "./data"

/** A space, to optimize readabilities, compare to empty string. */
const space = " "

/**
 * The default {@link Options} contains no wordless languages,
 * that you need to add required optimization manually.
 * Render wordless languages cost a lot,
 * it's recommended to only add required language ranges.
 *
 * For example, if you are using Chinese or Japanese with English,
 * you may consider code like this:
 * ```ts
 * import md from "markdown-it"
 * import {wordless} from 'markdown-it-wordless'
 * md.use(wordless)
 * ```
 */
export function wordless(md: md, options?: Options) {
  md.renderer.rules.softbreak = function (tokens, index) {
    if (index === 0 || index === tokens.length - 1) return space
    const prefix = tokens[index - 1].content
    const suffix = tokens[index + 1].content
    const before = langIndexOf(prefix.charCodeAt(prefix.length - 1), options)
    const after = langIndexOf(suffix.charCodeAt(0), options)
    return before === after && before !== -1 && before != -2 ? "" : space
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
}
