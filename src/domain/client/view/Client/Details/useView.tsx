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

  async function openClientBalancesModal(): Promise<void> {
    const Balances = (await import('../Balances')).default
    openModal(<Balances clientUuid={uuid} />)
  }

  async function zoomClientImage(imageSrc: string): Promise<void> {
    const ZoomImageModal = (await import('../../../../../shared/components/ZoomImageModal')).default
    openModal(<ZoomImageModal imageSrc={imageSrc} />)
  }

  return {
    client: data,
    isLoading,
    mutate,
    currentTab,
    openClientInfoModal,
    openClientBalancesModal,
    zoomClientImage,
  }
}

type UseClientDetailsView = {
  client: ClientModel | undefined
  isLoading: boolean
  mutate: KeyedMutator<ClientModel>
  currentTab: number
  openClientInfoModal: () => void
  openClientBalancesModal: () => void
  zoomClientImage: (image: string) => void
}
