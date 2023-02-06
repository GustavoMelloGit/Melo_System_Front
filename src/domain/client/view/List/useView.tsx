import { useNavigate } from 'react-router-dom'
import { Routes } from '../../../../lib/routes'
import useServiceParams from '../../../../shared/hooks/useServiceParams'
import { listClientsService } from '../../service'
import { type ClientsListView } from '../../types/view/List'

export default function useClientsListView(): ClientsListView {
  const navigate = useNavigate()
  const params = useServiceParams()
  const { data, error, isLoading, total } = listClientsService(params)

  function handleCreateClient(): void {
    navigate(Routes.createClient)
  }

  return {
    data,
    error,
    isLoading,
    handleCreateClient,
    total: total ?? 0,
  }
}
