import api from '../../../lib/config/api'
import { errorHandler } from '../../../lib/utils/errorHandler'
import useFetch, { type FetchConfig } from '../../../shared/hooks/useFetch'
import { type GetServiceResponse } from '../../../shared/types/service/GetServiceResponse'
import { type SWRServiceResponse } from '../../../shared/types/service/SWRServiceResponse'
import {
  type CoffeeTransactionModel,
  type CurrencyTransactionModel,
  type EscolhaTransactionModel,
  type FertilizerTransactionModel,
  type SacariaTransactionModel,
} from '../types/model/Transaction'

type Type = 'currency' | 'coffee' | 'escolha' | 'bags' | 'fertilizer'

type ResponseByType<T extends Type> = T extends 'currency'
  ? CurrencyTransactionModel
  : T extends 'coffee'
    ? CoffeeTransactionModel
    : T extends 'escolha'
      ? EscolhaTransactionModel
      : T extends 'bags'
        ? SacariaTransactionModel
        : T extends 'fertilizer'
          ? FertilizerTransactionModel
          : unknown

export async function getTransactionsFromClientService<T extends Type>(
  type: T,
  clientId: string,
  params?: string,
): Promise<GetServiceResponse<Array<ResponseByType<T>>>> {
  try {
    const response = await api.get(
      `/metrics/findAllTransactionsFromClient?type=${type}&clientId=${clientId}${params ? `&${params}` : ''}`,
    )
    return {
      data: response.data,
      error: null,
    }
  } catch (e) {
    return {
      data: null,
      error: errorHandler(e),
    }
  }
}

export function useGetTransactionsFromClientService<T extends Type>(
  type: T,
  clientId: string,
  params?: string,
  config?: FetchConfig,
): SWRServiceResponse<Array<ResponseByType<T>>> {
  const response = useFetch(
    `/metrics/findAllTransactionsFromClient?type=${type}&clientId=${clientId}${params ? `&${params}` : ''}`,
    config,
  )

  return response
}
