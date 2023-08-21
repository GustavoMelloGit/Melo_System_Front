import { apiDateToDateInput } from '../../../../lib/utils/date'
import useURLSearchParams from '../../../../shared/hooks/useURLSearchParams'
import { getBuyCoffeeMetrics } from '../../services/get'
import {
  type BuyCoffeeMetricsFilterOptions,
  type GetBuyCoffeeMetricsResponse,
} from '../../types/buy-coffee-metrics'
import { formatEndDate } from '../../utils/formatEndDate'
import { formatStartDate } from '../../utils/formatStartDate'

const initialDateInputValue = new Date().toISOString().split('T')[0]
const initialValues: BuyCoffeeMetricsFilterOptions = {
  endDate: initialDateInputValue,
  startDate: initialDateInputValue,
  coffeeType: 'bica_corrida',
  bebida: 'duro',
}

export default function useBuyCoffeeMetricsView(): UseBuyCoffeeMetricsView {
  const { queryParam, handleAddParam, allSearchParams } = useURLSearchParams({
    startDate: formatStartDate(initialDateInputValue),
    endDate: formatEndDate(initialDateInputValue),
  })
  const { data, isLoading } = getBuyCoffeeMetrics(queryParam)

  const handleSubmitFilters = (values: BuyCoffeeMetricsFilterOptions): void => {
    const { endDate, startDate } = values
    handleAddParam('startDate', formatStartDate(startDate))
    handleAddParam('endDate', formatEndDate(endDate))
    // objectEntries(restValues).forEach(([key, value]) => {
    //   handleAddParam(key, value)
    // })
  }

  const defaultValues: BuyCoffeeMetricsFilterOptions = {
    ...initialValues,
    startDate: allSearchParams?.startDate
      ? apiDateToDateInput(allSearchParams.startDate)
      : initialValues.startDate,
    endDate: allSearchParams?.endDate
      ? apiDateToDateInput(allSearchParams.endDate)
      : initialValues.endDate,
  }

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
