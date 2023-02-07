import { useParams } from 'react-router-dom'
import { type KeyedMutator } from 'swr'
import useURLSearchParams from '../../../../shared/hooks/useURLSearchParams'
import { getClientService } from '../../service'
import { type ClientModel } from '../../types/model/Client'

export default function useClientDetailsView(): UseClientDetailsView {
  const { uuid } = useParams()
  const { data, isLoading, mutate } = getClientService(uuid ?? '')
  const { handleAddParam, getParam } = useURLSearchParams()
  const currentTab = Number(getParam('tab')) ?? 0

  const handleChangeTab = (index: number): void => {
    handleAddParam('tab', index)
  }

  return {
    client: data,
    isLoading,
    mutate,
    handleChangeTab,
    currentTab,
  }
}

type UseClientDetailsView = {
  client: ClientModel | undefined
  isLoading: boolean
  mutate: KeyedMutator<ClientModel> | undefined
  handleChangeTab: (index: number) => void
  currentTab: number
}
