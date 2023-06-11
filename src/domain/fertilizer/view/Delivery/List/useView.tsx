import { toast } from 'react-hot-toast'
import { useModal } from '../../../../../shared/hooks/useModal'
import useServiceParams from '../../../../../shared/hooks/useServiceParams'
import useURLSearchParams from '../../../../../shared/hooks/useURLSearchParams'
import { type HTTPGetResponse } from '../../../../../shared/types/utils/service'
import { getFertilizersDeliveryPdf, getFertilizersDeliveryService } from '../../../services/get'
import {
  fertilizerDeliveryCancelService,
  fertilizerDeliveryDoneService,
} from '../../../services/put'
import {
  type FertilizerDeliveryModel,
  type FertilizerDeliveryStatuses,
} from '../../../types/model/Delivery'

export default function useFertilizerDeliveryView(): UseFertilizerDeliveryView {
  const params = useServiceParams()
  const { handleAddParam, getParam } = useURLSearchParams()
  const { data, isLoading, mutate } = getFertilizersDeliveryService(params)
  const currentStatus = getParam('status') as FertilizerDeliveryStatuses | null
  const openModal = useModal((state) => state.openModal)

  function handleChangeStatus(status: FertilizerDeliveryStatuses): void {
    handleAddParam('status', status)
  }

  async function handleOpenUpdateForm(pickup: FertilizerDeliveryModel): Promise<void> {
    const UpdateFertilizerDelivery = (await import('../Update')).default
    openModal(<UpdateFertilizerDelivery refetch={async () => mutate()} pickup={pickup} />)
  }

  async function handleCheckPickup(pickup: FertilizerDeliveryModel): Promise<void> {
    const { error } = await fertilizerDeliveryDoneService(pickup.id)
    if (error) {
      toast.error('Não foi possível concluir a entrega')
      return
    }
    toast.success('Entrega concluída com sucesso')
  }

  async function handleUncheckPickup(pickup: FertilizerDeliveryModel): Promise<void> {
    const { error } = await fertilizerDeliveryCancelService(pickup.id)
    if (error) {
      toast.error('Não foi possível cancelar a entrega')
      return
    }
    toast.success('Entrega cancelada com sucesso')
  }

  async function handleOpenCreateDeliveryForm(): Promise<void> {
    const CreateFertilizerDelivery = (await import('../Create')).default
    openModal(<CreateFertilizerDelivery refetch={async () => mutate()} />)
  }

  async function handleDownloadPDF(): Promise<void> {
    await getFertilizersDeliveryPdf()
  }

  return {
    currentStatus,
    handleChangeStatus,
    data,
    isLoading,
    handleOpenUpdateForm,
    handleCheckPickup,
    handleUncheckPickup,
    handleOpenCreateDeliveryForm,
    handleDownloadPDF,
  }
}

type UseFertilizerDeliveryView = {
  currentStatus: FertilizerDeliveryStatuses | null
  handleChangeStatus: (status: FertilizerDeliveryStatuses) => void
  data: HTTPGetResponse<FertilizerDeliveryModel[]> | undefined
  isLoading: boolean
  handleOpenUpdateForm: (pickup: FertilizerDeliveryModel) => Promise<void>
  handleCheckPickup: (pickup: FertilizerDeliveryModel) => Promise<void>
  handleUncheckPickup: (pickup: FertilizerDeliveryModel) => Promise<void>
  handleOpenCreateDeliveryForm: () => Promise<void>
  handleDownloadPDF: () => Promise<void>
}
