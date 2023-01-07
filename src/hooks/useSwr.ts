import axios from 'axios'
import useSWR, { Fetcher } from 'swr'

export const baseRequest = axios.create({
  baseURL: '/',
})

export function useSwrFactory<T>(key: string, fetcher: Fetcher<T>) {
  const response = useSWR(key, fetcher, {
    shouldRetryOnError: false,
  })

  return response
}

export function useSwr<T>(key: string, data?: any) {
  const fetcher = (url: string) =>
    baseRequest
      .post(`${url}`, data)
      .then(({ data }) => data)
      .catch((error) => {
        throw new Error(error.response.data.message)
      })

  return useSwrFactory<T>(key, fetcher)
}
