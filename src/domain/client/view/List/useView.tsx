import { limit, orderBy } from 'firebase/firestore'
import { DEFAULT_PAGINATION_LIMIT } from '../../../../lib/constants/pagination'
import { useSwrFirebase } from '../../../../lib/utils/firebase'
import { ClientModel } from '../../types/model/Client'
import { ClientsListView } from '../../types/view/List'

export default function useClientsListView(): ClientsListView {
  const { data, error } = useSwrFirebase<ClientModel[]>(
    'clients',
    orderBy('name'),
    limit(DEFAULT_PAGINATION_LIMIT),
  )

  return {
    data,
    error,
    isLoading: !data && !error,
  }
}
