import useSWR, { type KeyedMutator, type SWRConfiguration } from 'swr'
import api from '../../lib/config/api'
import { errorHandler } from '../../lib/utils/errorHandler'
import { Logger } from '../../lib/utils/Logger'

export default function useFetch<Data = any, Error = any>(
  url: string | null,
  config?: SWRConfiguration,
): UseFetch<Data, Error> {
  const { data, error, isLoading, mutate } = useSWR<Data, Error>(
    url,
    async (url: string) => {
      const response = await api.get(url)

      return response.data
    },
    config,
  )

  if (error) {
    const logger = new Logger()
    logger.error(errorHandler(error))
  }

  return { data, error, isLoading, mutate }
}

export type UseFetch<Data, Error> = {
  data: Data | undefined
  error: Error | undefined
  isLoading: boolean
  mutate: KeyedMutator<Data>
}
