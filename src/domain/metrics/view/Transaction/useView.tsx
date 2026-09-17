import { apiDateToDateInput, formatEndDate, formatStartDate } from '../../../../lib/utils/date'
import useURLSearchParams from '../../../../shared/hooks/useURLSearchParams'
import { useGetTransactionMetrics } from '../../services/getTransactionMetrics'
import {
  type GetTransactionMetricsResponse,
  type TransactionMetricsFilterOptions,
} from '../../types/transactionMetrics'

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
  const { data: rawData, isLoading } = useGetTransactionMetrics(queryParam)
  const data: GetTransactionMetricsResponse | undefined = rawData && {
    ...rawData,
    data: rawData.data
      .filter((transaction) => isWithinFilledDateRange(transaction.props.date, allSearchParams))
      .sort((a, b) => a.props.date - b.props.date),
  }

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

/**
 * The API filters transactions by when they were recorded, not by the
 * transaction's filled-in date, so a transaction filled with yesterday's
 * date but recorded today can be returned for a "today" filter. Re-filter
 * client-side by the actual filled-in date to match the selected range.
 */
function isWithinFilledDateRange(date: number, searchParams: Record<string, string>): boolean {
  const { startDate, endDate } = searchParams
  if (!startDate || !endDate) return true

  const startTime = new Date(startDate).getTime()
  const endTime = new Date(endDate).getTime()

  return date >= startTime && date <= endTime
}
