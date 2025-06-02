import { apiDateToDateInput, formatStartDate } from '../../../../lib/utils/date'
import useURLSearchParams from '../../../../shared/hooks/useURLSearchParams'
import { GetListResponse } from '../../../../shared/types/service/GetListResponse'
import { type ClientModel } from '../../../client/types/model/Client'
import { useGetInadimplentesMetrics } from '../../services/getInadimplentesMetrics'

const initialDateInputValue = new Date().toISOString().split('T')[0]
const initialValues = {
  startDate: initialDateInputValue,
}

export default function useInadimplentesMetricsView(): UseInadimplentesMetricsView {
  const { handleAddParam, allSearchParams } = useURLSearchParams({
    startDate: formatStartDate(initialDateInputValue),
  })
  const { data, isLoading } = useGetInadimplentesMetrics({
    limit: 999999,
    page: 1,
    startDate: allSearchParams?.startDate,
  })

  const handleSubmitFilters = (values: { startDate: string }): void => {
    const { startDate } = values
    handleAddParam('startDate', formatStartDate(startDate))
  }

  return {
    data: data ?? { data: [], limit: 0, page: 0, total: 0 },
    isLoading,
    defaultValues: {
      startDate: apiDateToDateInput(allSearchParams?.startDate) ?? initialValues.startDate,
    },
    handleSubmitFilters,
  }
}

export type UseInadimplentesMetricsView = {
  data: GetListResponse<ClientModel[]>
  isLoading: boolean
  defaultValues: { startDate: string }
  handleSubmitFilters: (values: { startDate: string }) => void
}
