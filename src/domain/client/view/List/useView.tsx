import { orderBy } from 'firebase/firestore'
import { useSwrFirebasePaginated } from '../../../../lib/utils/firebase'
import useTablePagination from '../../../../shared/hooks/useTablePagination'
import { ClientModel } from '../../types/model/Client'
import { ClientsListView } from '../../types/view/List'

export default function useClientsListView(): ClientsListView {
  const { rowsPerPage } = useTablePagination()
  const { data, error, fetchNextPage, fetchPreviousPage, changeRowsPerPage } =
    useSwrFirebasePaginated<ClientModel[]>('clients', rowsPerPage, orderBy('name'))

  return {
    data,
    error,
    isLoading: !data && !error,
    fetchNextPage,
    fetchPreviousPage,
    changeRowsPerPage,
  }
}
