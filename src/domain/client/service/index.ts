import { errorHandler } from '../../../lib/utils/error'
import useFetch from '../../../shared/hooks/useFetch'
import { type GetServiceResponse } from '../../../shared/types/utils/service'
import { type ClientModel } from '../types/model/Client'

export function listClientsService(): GetServiceResponse<ClientModel[]> {
  const { data, error, isLoading } = useFetch('/clients')

  return {
    data: data?.data,
    error: errorHandler(error),
    isLoading,
    total: data?.total ?? 0,
  }
}
