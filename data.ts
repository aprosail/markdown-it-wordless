/** Ensure an array is not empty. */
type NonEmptyArray<T> = [T, ...T[]]

/** A range of unicode numbers, mark its begin and end, the end is included. */
export type Range = [number, number]

/** Unicode {@link Range}s of a single language. */
export type LanguageRanges = NonEmptyArray<Range>

/**
 * The default value is empty, you need to add it manually.
 * Parsing wordless languages costs a lot.
 * It's strongly recommended to only introduce the required series.
 * For example:
 * ```ts
 * import {wordless, chineseAndJapanese, Options} from 'markdown-it-wordless'
 * md.use<Options>(wordless, {supportWordless: [chineseAndJapanese]})
 * ```
 */
export type Options = {
  /**
   * Most non-wordless languages have lower unicode than wordless languages.
   * Add optimizations of the non-wordless language you need to support,
   * and it will improve performance.
   *
   * Attention that {@link commonWords} is set inside default value.
   * Once customization, you need to include it manually.
   */
  optimizeWords?: LanguageRanges[]
  supportWordless: LanguageRanges[]
}

/** Unicode from zero to 0x0dff, commonly used language with words. */
export const commonWords: LanguageRanges = [[0x0000, 0x0dff]]

/**
 * Emoji is special ones:
 * Soft spaces between emojis will be kept,
 * while it won't add spaces between emojis and wordless languages.
 * And as it's special, the process of emoji is build-in,
 * and you should not include it inside the {@link Options}.
 */
export const emoji: LanguageRanges = [[0x1f000, 0x1fbff]]

/**
 * Chinese and Japanese characters (中文和日文/日本語と中国語).
 *
 * ## Special: about CJK
 *
 * 1. No space will be added between Chinese and Japanese,
 *    because they are similar and they all uses Chinese Characters (Kanji).
 * 2. In order to improve performance, it seems like Chinese and Japanese
 *    are treated as a single language here.
 * 3. Korean is not included here, because modern Korean has spaces
 *    between words, that Korean is not a wordless language.
 * 4. The old Chinese Pinyin is treated as another language here,
 *    it's not included inside the Chinese/Japanese series.
 */
export const chineseAndJapanese: LanguageRanges = [
  // [0x2e80, 0x2eff], // 部首补充/特殊ラジカル
  // [0x2f00, 0x2fdf], // 康熙部首/康熙字辞典のラジカル
  [0x2e80, 0x2fdf],

  // [0x3040, 0x309f], // 日文平假名/平仮名ひらがな
  // [0x30a0, 0x30ff], // 日文片假名/片仮名カタカナ
  [0x3040, 0x30ff],
  [0x3190, 0x319f], // 甲乙丙丁天地人...

  // [0x31c0, 0x31ef], // 笔画/筆画
  // [0x31f0, 0x31ff], // 日文片假名扩展/片仮名カタカナの拡張
  // [0x3200, 0x32ff], // 带圈符号/丸数字と丸印
  // [0x3300, 0x33ff], // 方形符号/ブロック風記号
  // [0x3400, 0x4dbf], // 汉字扩展A/漢字の拡張A
  // [0x4dc0, 0x4dff], // 易经卦象/易経の卦
  // [0x4e00, 0x9fff], // 常用汉字/普通使用する漢字
  [0x31c0, 0x9fff],

  [0xf900, 0xfaff], // 兼容汉字/コンパチブル漢字の拡張
  [0xfe10, 0xfe1f], // 竖排标点/縦書き記号
  [0xfe30, 0xfe4f], // 竖排标点扩展/縦書き記号の拡張
  [0xff00, 0xffef], // 全角符号/全角記号
  [0x1aff0, 0x1b16f], // 日文假名扩展/仮名の拡張

  // [0x1d300, 0x1d35f], // 太玄经符号/太玄經の記号
  // [0x1d360, 0x1d37f], // 算筹/筭木の記号
  [0x1d300, 0x1d37f],

  [0x20000, 0x2a6df], // 汉字扩展B/漢字の拡張B
  [0x2a700, 0x2ee5f], // 汉字扩展C~F/漢字の拡張C~F
  [0x2f800, 0x2fa1f], // 兼容汉字扩展/コンパチブル漢字の拡張
  [0x30000, 0x323af], // 汉字扩展G~H/漢字の拡張G~H
]

/** Tibetan(བོད་སྐད།/藏语) */
export const tibetan: LanguageRanges = [[0x0f00, 0x0fff]]

/** Thai(ภาษาไทย) */
export const thai: LanguageRanges = [[0x0e00, 0x0e7f]]

/** Lao(ພາສາລາວ) */
export const lao: LanguageRanges = [[0x0e80, 0x0eff]]

/** Cambodian(ខ្មែរ) */
export const cambodian: LanguageRanges = [
  [0x1780, 0x17ff],
  [0x19e0, 0x19ff],
]

/** Burmese(မြန်မာအက္ခရာ) */
export const burmese: LanguageRanges = [
  [0x1000, 0x109f],
  [0xa9e0, 0xa9ff],
  [0xaa60, 0xaa7f],
]

/** 彝文 */
export const yi: LanguageRanges = [[0x1a000, 0xa4cf]]

/** 德宏傣文 */
export const dehongDai: LanguageRanges = [[0x1950, 0x197f]]

/** 西双版纳新傣文 */
export const xishuangbannaNewDai: LanguageRanges = [[0x1e00, 0x1eff]]

/** 西双版纳老傣文 */
export const xishuangbannaOldDai: LanguageRanges = [[0x1a20, 0x1aaf]]

/** 江永女书 */
export const jiangyongWomanScript: LanguageRanges = [[0x1b170, 0x1b2ff]]

/** 旧版拼音 */
export const oldChinesePinyin: LanguageRanges = [
  [0x3100, 0x312f],
  [0x31a0, 0x31bf],
]

/** 契丹小字 */
export const khitanSmallScript: LanguageRanges = [[0x18b00, 0x18cff]]

/** 西夏文 */
export const tangut: LanguageRanges = [
  [0x17000, 0x18aff],
  [0x18d00, 0x18d7f],
]

/** Mesopotamia cuneiform script. */
export const cuneiform: LanguageRanges = [
  [0x12000, 0x123ff],
  [0x12400, 0x1247f],
  [0x12480, 0x1254f],
]

/** Ancient Egyptian hieroglyphs. */
export const hieroglyphics: LanguageRanges = [[0x13000, 0x1345f]]

/** Enable optimization for all registered wordless languages. */
export const allWordless: LanguageRanges[] = [
  chineseAndJapanese,
  tibetan,
  thai,
  lao,
  cambodian,
  burmese,
  yi,
  dehongDai,
  xishuangbannaNewDai,
  xishuangbannaOldDai,
  jiangyongWomanScript,
  oldChinesePinyin,
  khitanSmallScript,
  tangut,
  cuneiform,
  hieroglyphics,
]

/**
 * @param code unicode number of a character.
 * @param options {@link Options} for the wordless languages and
 * a series of non-wordless languages for optimization.
 * @returns Index of the character in the given wordless language series,
 * if there's not {@link Range} contains such code,
 * it means this is not a character of a wordless language,
 * and it will return -1. And if it's an emoji, it will return -2.
 */
export function langIndexOf(code: number, options?: Options): number {
  options = {
    optimizeWords: options?.optimizeWords ?? [commonWords],
    supportWordless: options?.supportWordless ?? allWordless,
  }

  // Process optimizations.
  for (const ranges of options!.optimizeWords!) {
    for (const range of ranges) {
      if (code >= range[0] && code <= range[1]) return -1
    }
  }

  // Process Emoji.
  for (const ranges of emoji) {
    for (const range of ranges) {
      if (code >= range[0] && code <= range[1]) return -2
    }
  }

  // Process wordless language index.
  const wordless = options!.supportWordless!
  for (let index = 0; index < wordless.length; index++) {
    const ranges = wordless[index]
    for (const range of ranges) {
      if (code >= range[0] && code <= range[1]) return index
    }
  }
  return -1
}
