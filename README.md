# Translate Serverless Vercel

> Translate API Vercel Serverless Functions

### Resume

- Serverless function for translating text using `@vitalets/google-translate-api`.
- Built following [Vercel's documentation](https://vercel.com/docs/v2/serverless-functions/supported-languages#using-typescript).

### Deploy it yourself

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/olavoparno/translate-serverless-vercel)

- Keep in mind that by using the lib `@vitalets/google-translate-api` you would have to setup a environment variable called `XDG_CONFIG_HOME` to `/tmp/.config/` in order to store its cookies.

### Endpoints

- {POST} /translate

### Translate

- This request accepts its payload configuration both as queryString or as body.
- See below the request and response respective interfaces.

```ts
interface ITranslateOptions {
  message: string
  from: string
  to: string
}

interface ITransResult {
  dst: string
  src: string
}

interface ITranslateResponse {
  from: string
  to: string
  trans_result: ITransResult
}
```

- Examples:

```js
fetch('https://translate-serverless.vercel.app/api/translate', {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
  },
  body: JSON.stringify({
    message: 'Translate me now!',
    from: 'en',
    to: 'pt',
  }),
})
  .then((data) => data.json())
  .then((response) => {
    console.log(response)
  })
  .catch((err) => {
    console.log(err)
  })
```

```sh
curl --request POST \
  --url https://translate-serverless.vercel.app/api/translate \
  --header 'content-type: application/json' \
  --data '{
	"message": "Translate me now!",
	"from": "en",
	"to": "pt"
}'
```

### Current supported languages abbreviations

```js
const languages = {
  'zh-CN': 'Chinese (Simplified)',
  'zh-TW': 'Chinese (Traditional)',
  af: 'Afrikaans',
  am: 'Amharic',
  ar: 'Arabic',
  auto: 'Automatic',
  az: 'Azerbaijani',
  be: 'Belarusian',
  bg: 'Bulgarian',
  bn: 'Bengali',
  bs: 'Bosnian',
  ca: 'Catalan',
  ceb: 'Cebuano',
  co: 'Corsican',
  cs: 'Czech',
  cy: 'Welsh',
  da: 'Danish',
  de: 'German',
  el: 'Greek',
  en: 'English',
  eo: 'Esperanto',
  es: 'Spanish',
  et: 'Estonian',
  eu: 'Basque',
  fa: 'Persian',
  fi: 'Finnish',
  fr: 'French',
  fy: 'Frisian',
  ga: 'Irish',
  gd: 'Scots Gaelic',
  gl: 'Galician',
  gu: 'Gujarati',
  ha: 'Hausa',
  haw: 'Hawaiian',
  he: 'Hebrew',
  hi: 'Hindi',
  hmn: 'Hmong',
  hr: 'Croatian',
  ht: 'Haitian Creole',
  hu: 'Hungarian',
  hy: 'Armenian',
  id: 'Indonesian',
  ig: 'Igbo',
  is: 'Icelandic',
  it: 'Italian',
  iw: 'Hebrew',
  ja: 'Japanese',
  jw: 'Javanese',
  ka: 'Georgian',
  kk: 'Kazakh',
  km: 'Khmer',
  kn: 'Kannada',
  ko: 'Korean',
  ku: 'Kurdish (Kurmanji)',
  ky: 'Kyrgyz',
  la: 'Latin',
  lb: 'Luxembourgish',
  lo: 'Lao',
  lt: 'Lithuanian',
  lv: 'Latvian',
  mg: 'Malagasy',
  mi: 'Maori',
  mk: 'Macedonian',
  ml: 'Malayalam',
  mn: 'Mongolian',
  mr: 'Marathi',
  ms: 'Malay',
  mt: 'Maltese',
  my: 'Myanmar (Burmese)',
  ne: 'Nepali',
  nl: 'Dutch',
  no: 'Norwegian',
  ny: 'Chichewa',
  pa: 'Punjabi',
  pl: 'Polish',
  ps: 'Pashto',
  pt: 'Portuguese',
  ro: 'Romanian',
  ru: 'Russian',
  sd: 'Sindhi',
  si: 'Sinhala',
  sk: 'Slovak',
  sl: 'Slovenian',
  sm: 'Samoan',
  sn: 'Shona',
  so: 'Somali',
  sq: 'Albanian',
  sr: 'Serbian',
  st: 'Sesotho',
  su: 'Sundanese',
  sv: 'Swedish',
  sw: 'Swahili',
  ta: 'Tamil',
  te: 'Telugu',
  tg: 'Tajik',
  th: 'Thai',
  tl: 'Filipino',
  tr: 'Turkish',
  uk: 'Ukrainian',
  ur: 'Urdu',
  uz: 'Uzbek',
  vi: 'Vietnamese',
  xh: 'Xhosa',
  yi: 'Yiddish',
  yo: 'Yoruba',
  zu: 'Zulu',
}
```

### Thanks

- Special thanks to [Lucas Mendes](https://github.com/LucasMendesl) a.k.a. mister snack.
