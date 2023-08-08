import { apiDateToDateInput } from '../../../../lib/utils/date'
import useURLSearchParams from '../../../../shared/hooks/useURLSearchParams'
import { getTransactionMetrics } from '../../services/get'
import {
  type GetTransactionMetricsResponse,
  type TransactionMetricsFilterOptions,
} from '../../types/transaction-metrics'

export const undefinedFilterType = 'undefined'
const initialDateInputValue = new Date().toISOString().split('T')[0]
const initialValues: TransactionMetricsFilterOptions = {
  endDate: initialDateInputValue,
  startDate: initialDateInputValue,
  type: undefinedFilterType,
}

export default function useTransactionMetricsView(): UseTransactionMetricsView {
  const { queryParam, handleAddParam, allSearchParams, handleRemoveParam } = useURLSearchParams()
  const { data, isLoading } = getTransactionMetrics(queryParam)

  const handleSubmitFilters = (values: TransactionMetricsFilterOptions): void => {
    const { endDate, startDate, type } = values
    handleAddParam('startDate', `${startDate}T00:00:00.000Z`)
    handleAddParam('endDate', `${endDate}T23:59:59.000Z`)
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
