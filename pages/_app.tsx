import { ReactElement } from 'react'

import TheBugging from 'the-bugging'

import type { AppProps } from 'next/app'

type Component = {
  getLayout?: (page: ReactElement) => JSX.Element
}

type AppPropsWithLayout = {
  Component: Component
} & Omit<AppProps, 'router'>

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  TheBugging.init({ projectKey: '1a9b9671-a98f-4fb7-ad37-5c67c206b80a' })

  return getLayout(<Component {...pageProps} />)
}
