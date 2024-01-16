import { PaginationParams } from '../../../../lib/constants/pagination'
import { apiDateToDateInput } from '../../../../lib/utils/date'
import useURLSearchParams from '../../../../shared/hooks/useURLSearchParams'
import { useGetBuyCoffeeMetrics } from '../../services/getBuyCoffeeMetrics'
import { type CoffeePriceMetricsFilterOptions } from '../../types/buyCoffeeMetrics'
import { type GetBuyCoffeeMetricsResponse } from '../../types/coffeePriceMetrics'
import { formatEndDate } from '../../utils/formatEndDate'
import { formatStartDate } from '../../utils/formatStartDate'

const initialDateInputValue = new Date().toISOString().split('T')[0]
const initialValues: CoffeePriceMetricsFilterOptions = {
  endDate: initialDateInputValue,
  startDate: initialDateInputValue,
  coffeeType: 'bica_corrida',
  bebida: 'duro',
}

export default function useBuyCoffeeMetricsView(): UseBuyCoffeeMetricsView {
  const { queryParam, handleAddParam, allSearchParams } = useURLSearchParams({
    startDate: formatStartDate(initialDateInputValue),
    endDate: formatEndDate(initialDateInputValue),
    [PaginationParams.sortBy]: 'value',
    [PaginationParams.sortOrder]: 'desc',
  })
  const { data, isLoading } = useGetBuyCoffeeMetrics(queryParam)

  const handleSubmitFilters = (values: CoffeePriceMetricsFilterOptions): void => {
    const { endDate, startDate } = values
    handleAddParam('startDate', formatStartDate(startDate))
    handleAddParam('endDate', formatEndDate(endDate))
    // objectEntries(restValues).forEach(([key, value]) => {
    //   handleAddParam(key, value)
    // })
  }

  const defaultValues: CoffeePriceMetricsFilterOptions = {
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
  defaultValues: CoffeePriceMetricsFilterOptions
  handleSubmitFilters: (values: CoffeePriceMetricsFilterOptions) => void
}
