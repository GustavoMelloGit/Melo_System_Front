import { DEFAULT_PAGINATION_LIMIT, PaginationParams } from '../../../../lib/constants/pagination'
import useURLSearchParams from '../../../../shared/hooks/useURLSearchParams'
import { type GetListResponse } from '../../../../shared/types/service/GetListResponse'
import { useGetClientsOwingCurrencyWithPositiveCoffee } from '../../services/getClientsOwingCurrencyWithPositiveCoffee'
import { type OwingCurrencyWithPositiveCoffeeClient } from '../../types/owingCurrencyWithPositiveCoffee'

const defaultSortBy = 'createdAt'
const defaultSortOrder = 'desc'

export default function useOwingCurrencyWithPositiveCoffeeMetricsView(): UseOwingCurrencyWithPositiveCoffeeMetricsView {
  const { allSearchParams } = useURLSearchParams({
    [PaginationParams.sortBy]: defaultSortBy,
    [PaginationParams.sortOrder]: defaultSortOrder,
    [PaginationParams.rowsPerPage]: String(DEFAULT_PAGINATION_LIMIT),
    [PaginationParams.page]: '0',
  })
  const { data, isLoading } = useGetClientsOwingCurrencyWithPositiveCoffee({
    limit: allSearchParams[PaginationParams.rowsPerPage] ?? DEFAULT_PAGINATION_LIMIT,
    page: allSearchParams[PaginationParams.page] ?? 0,
    orderBy: allSearchParams[PaginationParams.sortBy] ?? defaultSortBy,
    orderDirection: (allSearchParams[PaginationParams.sortOrder] ?? defaultSortOrder) as
      | 'asc'
      | 'desc',
    withDeleted: allSearchParams.withDeleted === 'true',
    oneDayInterval: allSearchParams.oneDayInterval,
    code: allSearchParams.code,
    showOnly: allSearchParams.showOnly as 'debit' | 'credit' | undefined,
    greaterThan: allSearchParams.greaterThan,
  })

  return {
    data: data ?? { data: [], limit: 0, page: 0, total: 0 },
    isLoading,
  }
}

export type UseOwingCurrencyWithPositiveCoffeeMetricsView = {
  data: GetListResponse<OwingCurrencyWithPositiveCoffeeClient[]>
  isLoading: boolean
}
