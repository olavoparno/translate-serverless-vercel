# Translate Serverless Now

> Translate API Vercel Serverless Functions

### Resume

- Serverless function for translating text using `baidu-translate-api`.
- Built following [Vercel's documentation](https://vercel.com/docs/v2/serverless-functions/supported-languages#using-typescript).

### Deploy it yourself

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/olavoparno/translate-serverless-now)

- Keep in mind that by using the lib `baidu-translate-api` you would have to setup a environment variable called `XDG_CONFIG_HOME` to `/tmp/.config/` in order to store its cookies.

### Endpoints

- {GET} /translate

### Translate

- This request accepts its payload configuration both as queryString or as body.
- See below the request and response respective interfaces.

- Try it in your browser https://translate-serverless.now.sh/api/translate?message=Translate%20me%20now!!!&from=auto&to=pt

```ts
export interface ITranslateOptions {
  message: string
  from: string
  to: string
}

export interface ITranslateResponse {
  information: string
  from: string
  to: string
  trans_result: {
    dst: string
    src: string
  }
}
```

- Examples:

```js
const myHeaders = new Headers()
myHeaders.append('Content-Type', 'application/json')

const raw = JSON.stringify({ message: 'Translate me now!!!', from: 'auto', to: 'pt' })

const requestOptions = {
  method: 'GET',
  headers: myHeaders,
  body: raw,
  redirect: 'follow',
}

fetch('translate-serverless.now.sh/api/translate', requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log('error', error))
```

```js
const requestOptions = {
  method: 'GET',
  redirect: 'follow',
}

fetch('translate-serverless.now.sh/api/translate?message=Translate%20me%20now!!!&from=auto&to=pt', requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log('error', error))
```

```sh
curl --location --request GET 'translate-serverless.now.sh/api/translate' \
--header 'Content-Type: application/json' \
--data-raw '{
	"message": "Translate me now!!!",
    "from": "auto",
    "to": "pt"
}'
```

### Current supported languages abbreviations

```js
const languages = {
  Auto: 'auto',
  Chinese: 'zh',
  English: 'en',
  Cantonese: 'yue',
  ClassicalChinese: 'wyw',
  Japanese: 'jp',
  Korean: 'kor',
  French: 'fra',
  Spanish: 'spa',
  Thai: 'th',
  Arabic: 'ara',
  Russian: 'ru',
  Portuguese: 'pt',
  German: 'de',
  Italian: 'it',
  Greek: 'el',
  Dutch: 'nl',
  Polish: 'pl',
  Bulgarian: 'bul',
  Estonian: 'est',
  Danish: 'dan',
  Finnish: 'fin',
  Czech: 'cs',
  Romanian: 'rom',
  Slovenia: 'slo',
  Swedish: 'swe',
  Hungarian: 'hu',
  TraditionalChinese: 'cht',
  Vietnamese: 'vie',
}
```

### Thanks

- Special thanks to [Lucas Mendes](https://github.com/LucasMendesl) a.k.a. mister snack.
