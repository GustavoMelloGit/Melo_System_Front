import { apiDateToDateInput } from '../../../../lib/utils/date'
import { isEmptyObject } from '../../../../lib/utils/isEmptyObject'
import useURLSearchParams from '../../../../shared/hooks/useURLSearchParams'
import { getBuyCoffeeMetrics } from '../../services/get'
import {
  type BuyCoffeeMetricsFilterOptions,
  type GetBuyCoffeeMetricsResponse,
} from '../../types/buy-coffee-metrics'

const initialDateInputValue = new Date().toISOString().split('T')[0]
const initialValues: BuyCoffeeMetricsFilterOptions = {
  endDate: initialDateInputValue,
  startDate: initialDateInputValue,
}

export default function useBuyCoffeeMetricsView(): UseBuyCoffeeMetricsView {
  const { queryParam, handleAddParam, allSearchParams } = useURLSearchParams()
  const { data, isLoading } = getBuyCoffeeMetrics(queryParam)

  const handleSubmitFilters = (values: BuyCoffeeMetricsFilterOptions): void => {
    const { endDate, startDate } = values
    handleAddParam('startDate', `${startDate}T00:00:00.000Z`)
    handleAddParam('endDate', `${endDate}T23:59:59.000Z`)
  }

  const defaultValues: BuyCoffeeMetricsFilterOptions = isEmptyObject(allSearchParams)
    ? {
        startDate: apiDateToDateInput(allSearchParams.startDate),
        endDate: apiDateToDateInput(allSearchParams.endDate),
      }
    : initialValues

  return {
    data,
    isLoading,
    defaultValues,
    handleSubmitFilters,
  }
}

export type UseBuyCoffeeMetricsView = {
  data: GetBuyCoffeeMetricsResponse | undefined
  isLoading: boolean
  defaultValues: BuyCoffeeMetricsFilterOptions
  handleSubmitFilters: (values: BuyCoffeeMetricsFilterOptions) => void
}
