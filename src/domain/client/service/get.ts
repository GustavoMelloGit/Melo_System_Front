import { errorHandler } from '../../../lib/utils/error'
import useFetch from '../../../shared/hooks/useFetch'
import { type GetServiceResponse } from '../../../shared/types/utils/service'
import { type ClientModel } from '../types/model/Client'
import { type TransactionModel } from '../types/model/Transaction'

export function getClientsService(params?: string): GetServiceResponse<ClientModel[]> {
  const { data, error, isLoading } = useFetch(`/clients?${params ?? ''}`)

  return {
    data: data?.data,
    error: errorHandler(error),
    isLoading,
    total: data?.total ?? 0,
  }
}

export function getClientService(id: string): GetServiceResponse<ClientModel> {
  const { data, error, isLoading, mutate } = useFetch(`/clients/${id}`)

  return {
    data,
    error: errorHandler(error),
    isLoading,
    mutate,
  }
}

export function getTransactionsService(
  clientId: string,
  params?: string,
): GetServiceResponse<TransactionModel[]> {
  const { data, error, isLoading, mutate } = useFetch(
    `/transactions/currency/${clientId}?${params ?? ''}`,
  )

  return {
    data: data?.data ?? [],
    error: errorHandler(error),
    isLoading,
    total: data?.total ?? 0,
    mutate,
  }
}
