import { formatRequestParams } from '../../../lib/utils/formatters'
import useFetch from '../../../shared/hooks/useFetch'
import { type GetListResponse } from '../../../shared/types/service/GetListResponse'
import { type SWRServiceResponse } from '../../../shared/types/service/SWRServiceResponse'
import { type ClientModel } from '../../client/types/model/Client'

type NumberString = number | string

/**
 * Cliente retornado pelo endpoint /metrics/owing-currency-with-positive-coffee.
 * Estende ClientModel com campos opcionais de saldo café (coffeeWeight / balances).
 */
export type OwingCurrencyWithPositiveCoffeeClient = ClientModel & {
  /** Saldo conta café em kg, retornado pelo endpoint. */
  coffeeBalance?: number
  coffeeWeight?: number
  balances?: {
    coffee?: number
    currency?: number
    [key: string]: unknown
  }
}

/**
 * Parâmetros aceitos pela rota GET /metrics/owing-currency-with-positive-coffee.
 */
export type OwingCurrencyWithPositiveCoffeeParams = {
  limit?: NumberString
  page?: NumberString
  orderBy?: string
  orderDirection?: 'asc' | 'desc'
  withDeleted?: boolean
  oneDayInterval?: string
  code?: NumberString
  showOnly?: 'debit' | 'credit'
  greaterThan?: NumberString
}

/**
 * Converte os parâmetros do hook para o formato aceito por formatRequestParams.
 */
function toRequestParams(
  possibleParams: Partial<OwingCurrencyWithPositiveCoffeeParams>,
): Record<string, string | number | undefined | null> {
  const p = possibleParams ?? {}
  return {
    limit: p.limit,
    page: p.page,
    orderBy: p.orderBy,
    orderDirection: p.orderDirection,
    withDeleted: p.withDeleted === true ? 'true' : p.withDeleted === false ? 'false' : undefined,
    oneDayInterval: p.oneDayInterval,
    code: p.code,
    showOnly: p.showOnly,
    greaterThan: p.greaterThan,
  }
}

/**
 * Hook que busca clientes devendo na conta corrente com saldo positivo na conta café.
 * @param possibleParams - Parâmetros de paginação, ordenação e filtros.
 * @returns Resposta SWR com lista paginada de clientes.
 */
export function useGetClientsOwingCurrencyWithPositiveCoffee(
  possibleParams?: Partial<OwingCurrencyWithPositiveCoffeeParams>,
): SWRServiceResponse<GetListResponse<OwingCurrencyWithPositiveCoffeeClient[]>> {
  const params = formatRequestParams(toRequestParams(possibleParams ?? {}))
  const response = useFetch<GetListResponse<OwingCurrencyWithPositiveCoffeeClient[]>>(
    `/metrics/owing-currency-with-positive-coffee?${params ?? ''}`,
  )

  return response
}
