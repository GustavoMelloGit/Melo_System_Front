import api from '../../../lib/config/api'
import { errorHandler } from '../../../lib/utils/errorHandler'
import { type GetServiceResponse } from '../../../shared/types/service/GetServiceResponse'
import {
  type CoffeeTransactionModel,
  type CurrencyTransactionModel,
  type EscolhaTransactionModel,
  type FertilizerTransactionModel,
  type SacariaTransactionModel,
} from '../types/model/Transaction'

export type ClientAccount = 'currency' | 'coffee' | 'escolha' | 'bags' | 'fertilizer'

export type ResponseByClientAccount<T extends ClientAccount> = T extends 'currency'
  ? CurrencyTransactionModel
  : T extends 'coffee'
    ? CoffeeTransactionModel
    : T extends 'escolha'
      ? EscolhaTransactionModel
      : T extends 'bags'
        ? SacariaTransactionModel
        : T extends 'fertilizer'
          ? FertilizerTransactionModel
          : never

export async function getTransactionsFromClientService<T extends ClientAccount>(
  type: T,
  clientId: string,
  params?: string,
): Promise<GetServiceResponse<Array<ResponseByClientAccount<T>>>> {
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
