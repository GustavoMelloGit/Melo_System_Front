import { PaginationParams } from '../../../../lib/constants/pagination'
import useURLSearchParams from '../../../../shared/hooks/useURLSearchParams'
import { getCredoresDevedoresCafeMetrics } from '../../services/getCredoresDevedoresCafe'
import { type ClientCoffeeMetric } from '../../types/credoresDevedoresCafeMetrics'

export default function useCredoresDevedoresCafeMetricsView(): UseBuyCoffeeMetricsView {
  const { allSearchParams } = useURLSearchParams({
    [PaginationParams.sortBy]: 'balance.total',
    [PaginationParams.sortOrder]: 'desc',
  })
  const { data, isLoading } = getCredoresDevedoresCafeMetrics({
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

export type UseBuyCoffeeMetricsView = {
  data: ClientCoffeeMetric[]
  isLoading: boolean
}
