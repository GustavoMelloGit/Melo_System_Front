import { useNavigate } from 'react-router-dom'
import { Routes } from '../../../../lib/routes'
import useParams from '../../../../shared/hooks/useParams'
import { type ClientsListView } from '../../types/view/List'

export default function useClientsListView(): ClientsListView {
  const navigate = useNavigate()
  const { getParam } = useParams()

  function handleCreateClient(): void {
    navigate(Routes.createClient)
  }

  function handleUpdateClient(uuid: string): void {
    navigate(Routes.updateClient(uuid))
  }

  return {
    data: [],
    error: undefined,
    isLoading: false,
    handleCreateClient,
    handleUpdateClient,
  }
}
