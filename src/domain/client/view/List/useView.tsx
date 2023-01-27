import { orderBy } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { DEFAULT_PAGINATION_LIMIT } from '../../../../lib/constants/pagination'
import { Routes } from '../../../../lib/routes'
import { useSwrFirebasePaginated } from '../../../../lib/utils/firebase'
import useParams from '../../../../shared/hooks/useParams'
import { type ClientModel } from '../../types/model/Client'
import { type ClientsListView } from '../../types/view/List'

export default function useClientsListView(): ClientsListView {
  const navigate = useNavigate()
  const { getParam } = useParams()
  const rowsPerPage = Number(getParam('rowsPerPage') ?? DEFAULT_PAGINATION_LIMIT)
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
