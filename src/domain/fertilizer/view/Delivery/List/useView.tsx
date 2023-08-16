import { toast } from 'react-hot-toast'
import { useModal } from '../../../../../shared/hooks/useModal'
import useServiceParams from '../../../../../shared/hooks/useServiceParams'
import useURLSearchParams from '../../../../../shared/hooks/useURLSearchParams'
import { type GetListResponse } from '../../../../../shared/types/utils/service'
import { getFertilizersDeliveryService } from '../../../services/get'
import {
  fertilizerDeliveryCancelService,
  fertilizerDeliveryDoneService,
} from '../../../services/put'
import {
  FertilizerDeliveryStatuses,
  type FertilizerDeliveryModel,
} from '../../../types/model/Delivery'

const initialStatus = FertilizerDeliveryStatuses.PENDING

export default function useFertilizerDeliveryView(): UseFertilizerDeliveryView {
  const params = useServiceParams()
  const { handleAddParam, getParam } = useURLSearchParams()
  const currentStatus = getParam('status') as FertilizerDeliveryStatuses | null
  const { data, isLoading, mutate } = getFertilizersDeliveryService(
    `${params}${currentStatus ? '' : `&status=${initialStatus}`}`,
  )
  const openModal = useModal((state) => state.openModal)

  function handleChangeStatus(status: FertilizerDeliveryStatuses): void {
    handleAddParam('status', status)
  }

  async function handleOpenUpdateForm(delivery: FertilizerDeliveryModel): Promise<void> {
    const UpdateFertilizerDelivery = (await import('../Update')).default
    openModal(<UpdateFertilizerDelivery refetch={async () => mutate()} delivery={delivery} />)
  }

  async function handleCheckPickup(delivery: FertilizerDeliveryModel): Promise<void> {
    const { error } = await fertilizerDeliveryDoneService(delivery.id)
    if (error) {
      toast.error('Não foi possível concluir a entrega')
      return
    }
    toast.success('Entrega concluída com sucesso')
    await mutate()
  }

  async function handleUncheckPickup(pickup: FertilizerDeliveryModel): Promise<void> {
    const { error } = await fertilizerDeliveryCancelService(pickup.id)
    if (error) {
      toast.error('Não foi possível cancelar a entrega')
      return
    }
    toast.success('Entrega cancelada com sucesso')
    await mutate()
  }

  async function handleOpenCreateDeliveryForm(): Promise<void> {
    const CreateFertilizerDelivery = (await import('../Create')).default
    openModal(<CreateFertilizerDelivery refetch={async () => mutate()} />)
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
  }
}

type UseFertilizerDeliveryView = {
  currentStatus: FertilizerDeliveryStatuses | null
  handleChangeStatus: (status: FertilizerDeliveryStatuses) => void
  data: GetListResponse<FertilizerDeliveryModel[]> | undefined
  isLoading: boolean
  handleOpenUpdateForm: (pickup: FertilizerDeliveryModel) => Promise<void>
  handleCheckPickup: (pickup: FertilizerDeliveryModel) => Promise<void>
  handleUncheckPickup: (pickup: FertilizerDeliveryModel) => Promise<void>
  handleOpenCreateDeliveryForm: () => Promise<void>
}
