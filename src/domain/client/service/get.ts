import { type SWRConfiguration } from 'swr'
import useFetch from '../../../shared/hooks/useFetch'
import { type HTTPGetResponse, type SWRServiceResponse } from '../../../shared/types/utils/service'
import { type ClientBalancesModel, type ClientModel } from '../types/model/Client'
import { type CurrencyTransactionModel } from '../types/model/Transaction'

export function getClientsService(
  params?: string,
  config?: SWRConfiguration,
): SWRServiceResponse<ClientModel[]> {
  const response = useFetch<HTTPGetResponse<ClientModel[]>>(`/clients?${params ?? ''}`, config)

  return response
}

export function getClientService(id: string): SWRServiceResponse<ClientModel> {
  const response = useFetch<HTTPGetResponse<ClientModel>>(`/clients/${id}`)

  return response
}

export function getTransactionsService(
  clientId: string,
  params?: string,
): SWRServiceResponse<CurrencyTransactionModel[]> {
  const response = useFetch<HTTPGetResponse<CurrencyTransactionModel[]>>(
    `/transactions/currency/${clientId}?${params ?? ''}`,
  )

  return response
}

export function getClientBalancesService(
  clientId: string | undefined,
): SWRServiceResponse<ClientBalancesModel> {
  const response = useFetch<HTTPGetResponse<ClientBalancesModel>>(
    clientId ? `/clients/${clientId}/balances` : null,
  )

  return response
}
