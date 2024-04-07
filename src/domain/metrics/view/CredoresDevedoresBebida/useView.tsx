import { PaginationParams } from '../../../../lib/constants/pagination'
import useURLSearchParams from '../../../../shared/hooks/useURLSearchParams'
import { useGetCredoresDevedoresBebidaMetrics } from '../../services/getCredoresDevedoresBebida'
import { type CreditorsAndDebtorsBebidaMetric } from '../../types/creditorsAndDebtorsBebidaMetrics'

export default function useCredoresDevedoresBebidaMetricsView(): UseCredoresDevedoresBebidaMetricsView {
  const { allSearchParams } = useURLSearchParams({
    [PaginationParams.sortBy]: 'balance.total',
    [PaginationParams.sortOrder]: 'desc',
  })
  const { data, isLoading } = useGetCredoresDevedoresBebidaMetrics({
    greaterThan: allSearchParams.greaterThan,
    limit: allSearchParams.limit,
    page: allSearchParams.page,
    [allSearchParams[PaginationParams.searchFor]]: allSearchParams[PaginationParams.searchBy],
    orderBy: allSearchParams[PaginationParams.sortBy],
    orderDirection: allSearchParams[PaginationParams.sortOrder] as 'asc' | 'desc',
    showOnly: allSearchParams.showOnly as any,
  })

  return {
    data: data ?? [],
    isLoading,
  }
}

export type UseCredoresDevedoresBebidaMetricsView = {
  data: CreditorsAndDebtorsBebidaMetric[]
  isLoading: boolean
}
