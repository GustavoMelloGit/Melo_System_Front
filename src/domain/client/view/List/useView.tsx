import { orderBy } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { Routes } from '../../../../lib/routes'
import { useSwrFirebasePaginated } from '../../../../lib/utils/firebase'
import useTablePagination from '../../../../shared/hooks/useTablePagination'
import { ClientModel } from '../../types/model/Client'
import { ClientsListView } from '../../types/view/List'

export default function useClientsListView(): ClientsListView {
  const navigate = useNavigate()
  const { rowsPerPage } = useTablePagination()
  const { data, error, fetchNextPage, fetchPreviousPage, changeRowsPerPage } =
    useSwrFirebasePaginated<ClientModel[]>('clients', rowsPerPage, orderBy('name'))

  function handleCreateClient(): void {
    navigate(Routes.createClient)
  }

  function handleUpdateClient(uuid: string): void {
    navigate(Routes.updateClient(uuid))
  }

  return {
    data,
    error,
    isLoading: !data && !error,
    fetchNextPage,
    fetchPreviousPage,
    changeRowsPerPage,
    handleCreateClient,
    handleUpdateClient,
  }
}
