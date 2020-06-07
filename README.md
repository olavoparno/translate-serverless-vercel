# Translate Serverless Now

> Translate API Vercel Serverless Functions

### Resume

- Serverless function for translating text using `baidu-translate-api`.
- Built following [Vercel's documentation](https://vercel.com/docs/v2/serverless-functions/supported-languages#using-typescript).

### Deploy it yourself

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/olavoparno/translate-serverless-now)

- Keep in mind that by using the lib `baidu-translate-api` you would have to setup a environment variable called `XDG_CONFIG_HOME` to `/tmp/.config/` in order to store its cookies.

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
fetch('https://translate-serverless.now.sh/api/translate', {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
  },
  body: {
    message: 'Translate me now!',
    from: 'en',
    to: 'pt',
  },
})
  .then((response) => {
    console.log(response)
  })
  .catch((err) => {
    console.log(err)
  })
```

```sh
curl --request POST \
  --url https://translate-serverless.now.sh/api/translate \
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
  Arabic: 'ara',
  Auto: 'auto',
  Bulgarian: 'bul',
  Cantonese: 'yue',
  Chinese: 'zh',
  ClassicalChinese: 'wyw',
  Czech: 'cs',
  Danish: 'dan',
  Dutch: 'nl',
  English: 'en',
  Estonian: 'est',
  Finnish: 'fin',
  French: 'fra',
  German: 'de',
  Greek: 'el',
  Hungarian: 'hu',
  Italian: 'it',
  Japanese: 'jp',
  Korean: 'kor',
  Polish: 'pl',
  Portuguese: 'pt',
  Romanian: 'rom',
  Russian: 'ru',
  Slovenia: 'slo',
  Spanish: 'spa',
  Swedish: 'swe',
  Thai: 'th',
  TraditionalChinese: 'cht',
  Vietnamese: 'vie',
}
```

### Thanks

- Special thanks to [Lucas Mendes](https://github.com/LucasMendesl) a.k.a. mister snack.
