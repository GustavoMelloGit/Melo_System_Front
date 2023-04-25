import { useParams } from 'react-router-dom'
import { type KeyedMutator } from 'swr'
import { useModal } from '../../../../../shared/hooks/useModal'
import useURLSearchParams from '../../../../../shared/hooks/useURLSearchParams'
import { getClientService } from '../../../service'
import { type ClientModel } from '../../../types/model/Client'

export default function useClientDetailsView(): UseClientDetailsView {
  const openModal = useModal((state) => state.openModal)
  const { uuid } = useParams()
  const { data, isLoading, mutate } = getClientService(uuid ?? '')
  const { getParam } = useURLSearchParams()
  const currentTab = Number(getParam('tab')) ?? 0

  async function openClientInfoModal(): Promise<void> {
    if (!data) return
    const GeneralInfo = (await import('../GeneralInfo')).default
    openModal(<GeneralInfo client={data} />)
  }

  return {
    client: data,
    isLoading,
    mutate,
    currentTab,
    openClientInfoModal,
  }
}

type UseClientDetailsView = {
  client: ClientModel | undefined
  isLoading: boolean
  mutate: KeyedMutator<ClientModel> | undefined
  currentTab: number
  openClientInfoModal: () => void
}
