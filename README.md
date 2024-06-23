# Markdown-it Wordless

A markdown-it plugin to optimize wordless multi-language space render.

When a paragraph is long in markdown, we usually separate them into lines.
But for wordless languages (such as Chinese and Japanese),
an extra line break will cause an unnecessary white space.
You can definitely set:

```ts
md.renderer.rules.softbreak = () => ""
```

to disable all spaces when line break,
but how about the condition when resolving multi-languages?

You can use this plugin to resolve the problem.
In this plugin, you can config in details
to resolve line break in multi-languages.
For example, when working with Chinese and English,
you can enable the softbreak for English but disable it for Chinese
by following configurations:

```ts
import {Options} from "markdown-it-wordless"
md.use(wordless)
```
