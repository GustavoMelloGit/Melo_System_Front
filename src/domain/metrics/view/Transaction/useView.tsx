import { apiDateToDateInput } from '../../../../lib/utils/date'
import useURLSearchParams from '../../../../shared/hooks/useURLSearchParams'
import { getTransactionMetrics } from '../../services/getTransactionMetrics'
import {
  type GetTransactionMetricsResponse,
  type TransactionMetricsFilterOptions,
} from '../../types/transactionMetrics'
import { formatEndDate } from '../../utils/formatEndDate'
import { formatStartDate } from '../../utils/formatStartDate'

export const undefinedFilterType = 'undefined'
const initialDateInputValue = new Date().toISOString().split('T')[0]
const initialValues: TransactionMetricsFilterOptions = {
  endDate: initialDateInputValue,
  startDate: initialDateInputValue,
  type: undefinedFilterType,
}

export default function useTransactionMetricsView(): UseTransactionMetricsView {
  const { queryParam, handleAddParam, allSearchParams, handleRemoveParam } = useURLSearchParams({
    startDate: formatStartDate(initialDateInputValue),
    endDate: formatEndDate(initialDateInputValue),
  })
  const { data, isLoading } = getTransactionMetrics(queryParam)

  const handleSubmitFilters = (values: TransactionMetricsFilterOptions): void => {
    const { endDate, startDate, type } = values
    handleAddParam('startDate', formatStartDate(startDate))
    handleAddParam('endDate', formatEndDate(endDate))
    if (type === undefinedFilterType) {
      handleRemoveParam('type')
    } else {
      handleAddParam('type', type)
    }
  }

  const defaultValues: TransactionMetricsFilterOptions = {
    startDate: allSearchParams?.startDate
      ? apiDateToDateInput(allSearchParams.startDate)
      : initialValues.startDate,
    endDate: allSearchParams?.endDate
      ? apiDateToDateInput(allSearchParams.endDate)
      : initialValues.endDate,
    type: allSearchParams?.type ?? initialValues.type,
  }

  return {
    data,
    isLoading,
    defaultValues,
    handleSubmitFilters,
  }
}

type UseTransactionMetricsView = {
  data: GetTransactionMetricsResponse | undefined
  isLoading: boolean
  defaultValues: TransactionMetricsFilterOptions
  handleSubmitFilters: (values: TransactionMetricsFilterOptions) => void
}
