import useSWR, { type KeyedMutator, type SWRConfiguration } from 'swr'
import api from '../../lib/config/api'

export type FetchConfig = SWRConfiguration & {
  /**
   * If enabled equals false, the request is only triggered by using the "refetch" function
   */
  enabled?: boolean
}
export default function useFetch<Data = any, Error = any>(
  url: string | null,
  config?: FetchConfig,
): UseFetch<Data, Error> {
  const isEnabled = typeof config?.enabled === 'undefined' || config.enabled
  const { data, error, isLoading, mutate } = useSWR<Data, Error>(
    isEnabled ? url : null,
    async (url: string) => {
      const response = await api.get(url)

      return response.data
    },
    config,
  )

  return { data, error, isLoading, mutate }
}

export type UseFetch<Data, Error> = {
  data: Data | undefined
  error: Error | undefined
  isLoading: boolean
  mutate: KeyedMutator<Data>
}
