import useServiceParams from '../../../../shared/hooks/useServiceParams'
import { listClientsService } from '../../service'
import { type ClientsListView } from '../../types/view/List'

export default function useClientsListView(): ClientsListView {
  const params = useServiceParams()
  const { data, error, isLoading, total } = listClientsService(params)
  return {
    data,
    error,
    isLoading,
    total: total ?? 0,
  }
}
