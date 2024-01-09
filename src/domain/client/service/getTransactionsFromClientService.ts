import { type SWRConfiguration } from 'swr'
import useFetch from '../../../shared/hooks/useFetch'
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

export function useGetTransactionsFromClientService<T extends Type>(
  type: T,
  clientId: string,
  config?: SWRConfiguration,
): SWRServiceResponse<Array<ResponseByType<T>>> {
  const response = useFetch(
    `/metrics/findAllTransactionsFromClient?type=${type}&clientId=${clientId}`,
    config,
  )

  return response
}
