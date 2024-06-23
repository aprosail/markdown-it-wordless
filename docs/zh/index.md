# Markdown-it 换行空格优化插件

包括中文在内的很多语言文字不像英文那样使用空格来分割词汇。
在使用 Markdown 时，遇到段落很长，通常会将其分割成很多行。
但 Markdown 在渲染时会默认将换行渲染为空格，
而这样的空格在中文这种不用空格分割词汇的语言中显然是不合适的。

```ts:line-numbers
import md from "markdown-it"
md.renderer.rules.softbreak = () => "" // [!code focus]
```

在使用 [markdown-it](https://markdown-it.github.io) 时，
可以通过上面的配置让 Markdown 中的单个换行符渲染为空字符串而非空格，
但这样一来，对像英语这种需要用空格来分割单词的语言又会出问题。
即在多语言文档，尤其是同时存在
像中文这样不用空格分割词汇的语言 (wordless language)
和像英语这样需要用空格来分割单词的语言 (wordful language) 时，
这种简单的配置就不起作用了。

所以作者才写了这个插件来处理这种问题：
使用这个插件后，使用 Markdown 编辑中文这样的语言时，
就可以随意的换行来而不必担心句子里被添加不美观的空格的问题了。

```ts:line-numbers
import md from "markdown-it"
import {Options} from "markdown-it-wordless"
md.use(wordless) // [!code focus]
```
