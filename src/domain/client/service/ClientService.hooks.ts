import useFetch, { type FetchConfig } from '../../../shared/hooks/useFetch'
import { type GetListResponse } from '../../../shared/types/service/GetListResponse'
import { type SWRServiceResponse } from '../../../shared/types/service/SWRServiceResponse'
import { type ClientBalancesModel, type ClientModel } from '../types/model/Client'
import { type CurrencyTransactionModel } from '../types/model/Transaction'

export function useGetBirthdaysService(
  month: string | number,
  config?: FetchConfig,
): SWRServiceResponse<ClientModel[]> {
  const response = useFetch<ClientModel[]>(`/birthdays?month=${month}`, config)

  return response
}

export function useGetClientService(id: string): SWRServiceResponse<ClientModel> {
  const response = useFetch<ClientModel>(`/clients/${id}`)

  return response
}

export function useGetTransactionsService(
  clientId: string,
  params?: string,
): SWRServiceResponse<GetListResponse<CurrencyTransactionModel[]>> {
  const response = useFetch<GetListResponse<CurrencyTransactionModel[]>>(
    `/transactions/currency/${clientId}?${params ?? ''}`,
  )

  return response
}

export function useGetClientBalancesService(
  clientId: string | undefined,
): SWRServiceResponse<ClientBalancesModel> {
  const response = useFetch<ClientBalancesModel>(clientId ? `/clients/${clientId}/balances` : null)

  return response
}

export function useGetClientsService(
  params?: string,
  config?: FetchConfig,
): SWRServiceResponse<GetListResponse<ClientModel[]>> {
  const response = useFetch<GetListResponse<ClientModel[]>>(`/clients?${params ?? ''}`, config)

  return response
}
