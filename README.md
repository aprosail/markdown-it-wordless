# Markdown-it Wordless

A markdown-it plugin to optimize wordless multi-language line-break render.

When a paragraph is long in markdown, we usually separate them into lines,
and it will finally be rendered into a single line inside HTML.
But for wordless languages (such as Chinese and Japanese),
they do not use spaces to separate words,
that they don't need a space to be added when processing line-break.

If you are only working with a single wordless language,
you can definitely use the following code,
which will disable all spaces when line break
(render single `\n` into an empty string rather than a space):

```ts
md.renderer.rules.softbreak = () => ""
```

But once working with multi-languages,
especially when there's a mix of wordless and wordful languages,
such as using Chinese and English in a single markdown document,
such options cannot handle all cases.
So here comes this `"markdown-it-wordless"` plugin,
and you can use it like this:

```ts
import {Options} from "markdown-it-wordless"
md.use(wordless)
```

## Basic functions

1. Wordful languages (such as English and Arabic) will be rendered as usual.
2. It won't add a space when line break between the same wordless language.
3. It will add a space when line break between different wordless languages.
4. Specially, Chinese and Japanese will be treated as a same language,
   as there are many shared characters between them,
   and their character styles are almost the same.
5. Although Korean characters are like Chinese and Japanese (CJK),
   Korean is not a wordless language, it uses spaces to separate words.

## Use it with VitePress

[VitePress](https://vitepress.dev) is an excellent static site generator,
and this package is also inspired when the author using VitePress.
It's strongly recommended to add such plugin to VitePress
if you are using wordless languages. And here's how to config:

```ts
// <root>/.vitepress/config.ts
import {defineConfig} from "vitepress"
import {wordless} from "markdown-it-wordless"

export default defineConfig({
  markdown: {
    config(md) {
      md.use(wordless)
    },
  },
  // Other configs...
})
```
