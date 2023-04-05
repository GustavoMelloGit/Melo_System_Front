import useServiceParams from '../../../../../shared/hooks/useServiceParams'
import { getClientsService } from '../../../service'
import { type ClientModel } from '../../../types/model/Client'

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

export type ClientsListView = {
  data: ClientModel[] | undefined
  error: string | undefined
  isLoading: boolean
  total: number
}
