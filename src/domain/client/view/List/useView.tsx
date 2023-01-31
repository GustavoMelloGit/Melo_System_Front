import { useNavigate } from 'react-router-dom'
import { Routes } from '../../../../lib/routes'
import { listClientsService } from '../../service'
import { type ClientsListView } from '../../types/view/List'

export default function useClientsListView(): ClientsListView {
  const navigate = useNavigate()
  const { data, error, isLoading, total } = listClientsService()

  function handleCreateClient(): void {
    navigate(Routes.createClient)
  }

  function handleUpdateClient(uuid: string): void {
    navigate(Routes.updateClient(uuid))
  }

  return {
    data,
    error,
    isLoading,
    handleCreateClient,
    handleUpdateClient,
    total,
  }
}
