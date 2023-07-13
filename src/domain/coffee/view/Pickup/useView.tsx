import { useRef } from 'react'
import { toast } from 'react-hot-toast'
import { useModal } from '../../../../shared/hooks/useModal'
import useServiceParams from '../../../../shared/hooks/useServiceParams'
import useURLSearchParams from '../../../../shared/hooks/useURLSearchParams'
import {
  type GetListResponse,
  type SWRServiceResponse,
} from '../../../../shared/types/utils/service'
import { getPickupOrdersService, getPickupPdf } from '../../services/Pickup/get'
import { pickupCoffeeDoneService, pickupCoffeePendingService } from '../../services/Pickup/put'
import { PickupCoffeeStatuses, type PickupCoffeeModel } from '../../types/model/pickup'

const initialStatus = PickupCoffeeStatuses.PENDING

export default function usePickupView(): UsePickupView {
  const { handleAddParam, getParam } = useURLSearchParams()
  const params = useServiceParams()
  const currentStatus = getParam('status') as PickupCoffeeStatuses | null
  const order = getPickupOrdersService(
    `${params}${currentStatus ? '' : `&status=${initialStatus}`}`,
  )
  const openModal = useModal((state) => state.openModal)
  const test = useRef<HTMLButtonElement>(null)

  async function handleOpenForm(): Promise<void> {
    try {
      const CreateCoffeePickup = (await import('../../components/Pickup/Create')).default
      openModal(
        <CreateCoffeePickup
          onSuccess={() => {
            void order.mutate?.()
          }}
        />,
      )
    } catch (e) {
      console.error(e)
    }
  }

  async function handleOpenUpdateForm(pickup: PickupCoffeeModel): Promise<void> {
    try {
      const UpdateCoffeePickup = (await import('../../components/Pickup/Update')).default
      openModal(
        <UpdateCoffeePickup
          pickup={pickup}
          onSuccess={() => {
            void order.mutate?.()
          }}
        />,
      )
    } catch (e) {
      console.error(e)
    }
  }

  async function handleCheckPickup(pickup: PickupCoffeeModel): Promise<void> {
    const { error } = await pickupCoffeeDoneService(pickup.id)
    if (error) {
      toast.error('Não foi possível finalizar o pedido de coleta')
      return
    }
    toast.success('Pedido de coleta finalizado com sucesso')
    void order.mutate?.()
  }

  async function handleUncheckPickup(pickup: PickupCoffeeModel): Promise<void> {
    const { error } = await pickupCoffeePendingService(pickup.id)
    if (error) {
      toast.error('Não foi possível desmarcar o pedido de coleta')
      return
    }
    toast.success('Pedido de coleta desmarcado com sucesso')
    void order.mutate?.()
  }

  async function handleDownloadList(): Promise<void> {
    await getPickupPdf()
  }

  function handleChangeStatus(status: PickupCoffeeStatuses): void {
    handleAddParam('status', status)
  }

  return {
    order,
    handleOpenForm,
    handleOpenUpdateForm,
    handleCheckPickup,
    handleChangeStatus,
    currentStatus,
    handleUncheckPickup,
    handleDownloadList,
    test,
  }
}

type UsePickupView = {
  order: SWRServiceResponse<GetListResponse<PickupCoffeeModel[]>>
  handleOpenForm: () => Promise<void>
  handleOpenUpdateForm: (pickup: PickupCoffeeModel) => Promise<void>
  handleCheckPickup: (pickup: PickupCoffeeModel) => Promise<void>
  handleUncheckPickup: (pickup: PickupCoffeeModel) => Promise<void>
  handleChangeStatus: (status: PickupCoffeeStatuses) => void
  handleDownloadList: () => Promise<void>
  currentStatus: PickupCoffeeStatuses | null
  test: React.RefObject<HTMLButtonElement>
}
