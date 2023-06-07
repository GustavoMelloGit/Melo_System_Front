import useServiceParams from '../../../../shared/hooks/useServiceParams'
import useURLSearchParams from '../../../../shared/hooks/useURLSearchParams'
import { type HTTPGetResponse } from '../../../../shared/types/utils/service'
import { getFertilizersDeliveryService } from '../../services/get'
import {
  type FertilizerDeliveryModel,
  type FertilizerDeliveryStatuses,
} from '../../types/model/Delivery'

export default function useFertilizerDeliveryView(): UseFertilizerDeliveryView {
  const params = useServiceParams()
  const { handleAddParam, getParam } = useURLSearchParams()
  const { data, isLoading } = getFertilizersDeliveryService(params)
  const currentStatus = getParam('status') as FertilizerDeliveryStatuses | null

  function handleChangeStatus(status: FertilizerDeliveryStatuses): void {
    handleAddParam('status', status)
  }

  async function handleOpenUpdateForm(): Promise<void> {
    console.log('handleOpenUpdateForm')
  }

  async function handleCheckPickup(): Promise<void> {
    console.log('handleCheckPickup')
  }

  async function handleUncheckPickup(): Promise<void> {
    console.log('handleUncheckPickup')
  }

  return {
    currentStatus,
    handleChangeStatus,
    data,
    isLoading,
    handleOpenUpdateForm,
    handleCheckPickup,
    handleUncheckPickup,
  }
}

type UseFertilizerDeliveryView = {
  currentStatus: FertilizerDeliveryStatuses | null
  handleChangeStatus: (status: FertilizerDeliveryStatuses) => void
  data: HTTPGetResponse<FertilizerDeliveryModel[]> | undefined
  isLoading: boolean
  handleOpenUpdateForm: () => Promise<void>
  handleCheckPickup: () => Promise<void>
  handleUncheckPickup: () => Promise<void>
}
