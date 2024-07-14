import type { App } from 'vue'
import { type Locale, createI18n } from 'vue-i18n'

const i18n = createI18n({
  legacy: false, // set `false` to use Composition API
  locale: '',
  messages: {},
})

const localesMap = Object.fromEntries(Object.entries(import.meta.glob('../../locales/*.json')).map(([path, loadLocale]) => [
  path.match(/([\w-]*)\.json$/)?.[1],
  loadLocale,
])) as Record<Locale, () => Promise<{ default: Record<string, string> }>>

const ePLocalesMap = Object.fromEntries(Object.entries(import.meta.glob('../../node_modules/element-plus/dist/locale/*.mjs')).map(([path, loadLocale]) => [
  path.match(/([\w-]*)\.mjs$/)?.[1],
  loadLocale,
])) as Record<Locale, () => Promise<{ default: Record<string, string> }>>

export const availableLocales = Object.keys(localesMap)
const loadedLanguages: string[] = []

const filterEPLocalesMap = availableLocales.reduce((acc: Record<Locale, () => Promise<{ default: Record<string, string> }>>, locale: Locale) => {
  return { ...acc, [locale]: ePLocalesMap[locale.toLocaleLowerCase()] }
}, {})
export function setI18nLanguage(locale: string) {
  i18n.global.locale.value = locale
  /**
   * NOTE:
   * If you need to specify the language setting for headers, such as the `fetch` API, set it here.
   * The following is an example for axios.
   *
   * axios.defaults.headers.common['Accept-Language'] = locale
   */
  if (typeof document !== 'undefined')
    document.querySelector('html')?.setAttribute('lang', locale)
}

export async function loadLocaleMessages(lang: string) {
  if (loadedLanguages.includes(lang) || i18n.global.locale.value === lang)
    return setI18nLanguage(lang)

  // load locale messages with dynamic import
  const messages = await localesMap[lang]()
  const messagesEP = await filterEPLocalesMap[lang]()

  // set locale and locale message
  i18n.global.setLocaleMessage(lang, { ...messagesEP.default, ...messages.default })
  loadedLanguages.push(lang)
  return setI18nLanguage(lang)
}

export default {
  install(app: App) {
    app.use(i18n)
    loadLocaleMessages('zh-CN')
  },
}
