import { useParams } from 'react-router-dom'
import { type KeyedMutator } from 'swr'
import { getClientService } from '../../service'
import { type ClientModel } from '../../types/model/Client'

export default function useClientDetailsView(): UseClientDetailsView {
  const { uuid } = useParams()
  const { data, isLoading, mutate } = getClientService(uuid ?? '')

  return {
    client: data,
    isLoading,
    mutate,
  }
}

type UseClientDetailsView = {
  client: ClientModel | undefined
  isLoading: boolean
  mutate: KeyedMutator<ClientModel> | undefined
}
