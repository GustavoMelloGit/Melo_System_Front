import useServiceParams from '../../../../shared/hooks/useServiceParams'
import { getClientsService } from '../../service'
import { type ClientsListView } from '../../types/view/List'

export default function useClientsListView(): ClientsListView {
  const params = useServiceParams()
  const { data, error, isLoading, total } = getClientsService(params)
  return {
    data,
    error,
    isLoading,
    total: total ?? 0,
  }
}
