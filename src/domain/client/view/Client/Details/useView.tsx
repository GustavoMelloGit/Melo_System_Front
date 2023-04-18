import { useParams } from 'react-router-dom'
import { type KeyedMutator } from 'swr'
import useURLSearchParams from '../../../../../shared/hooks/useURLSearchParams'
import { getClientService } from '../../../service'
import { type ClientModel } from '../../../types/model/Client'

export default function useClientDetailsView(): UseClientDetailsView {
  const { uuid } = useParams()
  const { data, isLoading, mutate } = getClientService(uuid ?? '')
  const { getParam } = useURLSearchParams()
  const currentTab = Number(getParam('tab')) ?? 0

  return {
    client: data,
    isLoading,
    mutate,
    currentTab,
  }
}

type UseClientDetailsView = {
  client: ClientModel | undefined
  isLoading: boolean
  mutate: KeyedMutator<ClientModel> | undefined
  currentTab: number
}
