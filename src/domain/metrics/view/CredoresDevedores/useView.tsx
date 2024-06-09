import { PaginationParams } from '../../../../lib/constants/pagination'
import useURLSearchParams from '../../../../shared/hooks/useURLSearchParams'
import { type ClientModel } from '../../../client/types/model/Client'
import { useGetCredoresDevedoresMetrics, type ShowOnly } from '../../services/getCredoresDevedores'

export default function useCredoresDevedoresMetricsView(): UseBuyCoffeeMetricsView {
  const { allSearchParams } = useURLSearchParams({
    [PaginationParams.sortBy]: 'balance',
    [PaginationParams.sortOrder]: 'desc',
  })
  const { data, isLoading } = useGetCredoresDevedoresMetrics(
    {
      greaterThan: allSearchParams.greaterThan,
      limit: allSearchParams[PaginationParams.rowsPerPage],
      page: allSearchParams[PaginationParams.page],
      [allSearchParams[PaginationParams.searchFor]]: allSearchParams[PaginationParams.searchBy],
      orderBy: allSearchParams[PaginationParams.sortBy],
      orderDirection: allSearchParams[PaginationParams.sortOrder] as 'asc' | 'desc',
      showOnly: allSearchParams.showOnly as ShowOnly,
    },
    {
      enabled: false,
    },
  )

  return {
    data: data ?? [],
    isLoading,
  }
}

export type UseBuyCoffeeMetricsView = {
  data: ClientModel[]
  isLoading: boolean
}
