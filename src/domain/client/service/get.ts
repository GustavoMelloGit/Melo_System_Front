import { type SWRConfiguration } from 'swr'
import useFetch, { type UseFetch } from '../../../shared/hooks/useFetch'
import { type GetListResponse, type SWRServiceResponse } from '../../../shared/types/utils/service'
import { type ClientBalancesModel, type ClientModel } from '../types/model/Client'
import { type CurrencyTransactionModel } from '../types/model/Transaction'

export function getClientsService(
  params?: string,
  config?: SWRConfiguration,
): SWRServiceResponse<GetListResponse<ClientModel[]>> {
  const response = useFetch<GetListResponse<ClientModel[]>>(`/clients?${params ?? ''}`, config)

  return response
}

export function getClientService(id: string): UseFetch<ClientModel, any> {
  const response = useFetch<ClientModel>(`/clients/${id}`)

  return response
}

export function getTransactionsService(
  clientId: string,
  params?: string,
): SWRServiceResponse<GetListResponse<CurrencyTransactionModel[]>> {
  const response = useFetch<GetListResponse<CurrencyTransactionModel[]>>(
    `/transactions/currency/${clientId}?${params ?? ''}`,
  )

  return response
}

export function getClientBalancesService(
  clientId: string | undefined,
): SWRServiceResponse<ClientBalancesModel> {
  const response = useFetch<ClientBalancesModel>(clientId ? `/clients/${clientId}/balances` : null)

  return response
}
