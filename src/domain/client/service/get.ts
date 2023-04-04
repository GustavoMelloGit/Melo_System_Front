import { type SWRConfiguration } from 'swr'
import { errorHandler } from '../../../lib/utils/error'
import useFetch from '../../../shared/hooks/useFetch'
import {
  type GetServiceResponse,
  type GetServiceSwrResponse,
} from '../../../shared/types/utils/service'
import { type ClientModel } from '../types/model/Client'
import { type CurrencyTransactionModel } from '../types/model/Transaction'

export function getClientsService(
  params?: string,
  config?: SWRConfiguration,
): GetServiceResponse<ClientModel[]> {
  const { data, error, isLoading } = useFetch(`/clients?${params ?? ''}`, config)

  return {
    data: data?.data,
    error: errorHandler(error),
    isLoading,
    total: data?.total ?? 0,
  }
}

export function getClientService(id: string): GetServiceSwrResponse<ClientModel> {
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
): GetServiceSwrResponse<CurrencyTransactionModel[]> {
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
