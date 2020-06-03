# Translate Serverless Now

> Translate API Vercel Serverless Functions

### Resume

- Serverless function for translating text using `baidu-translate-api`.
- Built following [Vercel's documentation](https://vercel.com/docs/v2/serverless-functions/supported-languages#using-typescript).

### Deploy it yourself

- Keep in mind that by using the lib `baidu-translate-api` you would have to setup a environment variable called `XDG_CONFIG_HOME` to `/tmp/.config/` in order to store its cookies.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/olavoparno/translate-serverless-now)

### Endpoints

- {GET} /translate

### Translate

- This request accepts its payload configuration both as queryString or as body with a simple interface as follows:

```ts
interface ITranslateOptions {
  message: string
  from: string
  to: string
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

fetch('translate-serverless.now.sh/api/translate?message=Pedro%20gatinho&from=pt&to=en', requestOptions)
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

### Thanks

- Special thanks to [Lucas Mendes](https://github.com/LucasMendesl) a.k.a. mister snack.
