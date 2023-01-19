import { useSwrFirebase } from '../../../../lib/utils/firebase'
import { ClientModel } from '../../types/model/Client'
import { ClientsListView } from '../../types/view/List'

export default function useClientsListView(): ClientsListView {
  const { data, error } = useSwrFirebase<ClientModel[]>('clients')

  return {
    data,
    error,
    isLoading: !data && !error,
  }
}
