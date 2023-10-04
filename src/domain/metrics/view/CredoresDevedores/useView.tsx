import { PaginationParams } from '../../../../lib/constants/pagination'
import useURLSearchParams from '../../../../shared/hooks/useURLSearchParams'
import { type ClientModel } from '../../../client/types/model/Client'
import { getCredoresDevedoresMetrics } from '../../services/getCredoresDevedores'

export default function useCredoresDevedoresMetricsView(): UseBuyCoffeeMetricsView {
  const { allSearchParams } = useURLSearchParams()
  const { data, isLoading } = getCredoresDevedoresMetrics({
    greaterThan: allSearchParams.greaterThan,
    limit: allSearchParams.limit,
    page: allSearchParams.page,
    [allSearchParams[PaginationParams.searchFor]]: allSearchParams[PaginationParams.searchBy],
    orderBy: allSearchParams[PaginationParams.sortBy],
    orderDirection: allSearchParams[PaginationParams.sortOrder] as 'asc' | 'desc',
    showOnly: allSearchParams.showOnly as any,
  })

  return {
    data: data?.data ?? [],
    isLoading,
  }
}

export type UseBuyCoffeeMetricsView = {
  data: ClientModel[]
  isLoading: boolean
}
