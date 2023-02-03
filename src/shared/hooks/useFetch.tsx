import useSWR, { type KeyedMutator } from 'swr'
import api from '../../lib/service/api'

export default function useFetch<Data = any, Error = any>(url: string): UseFetch<Data, Error> {
  const { data, error, isLoading, mutate } = useSWR<Data, Error>(url, async (url) => {
    const response = await api.get(url)

    return response.data
  })

  return { data, error, isLoading, mutate }
}

export type UseFetch<Data, Error> = {
  data: Data | undefined
  error: Error | undefined
  isLoading: boolean
  mutate: KeyedMutator<Data>
}
