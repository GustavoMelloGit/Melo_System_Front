import { toast } from 'react-hot-toast'
import { useModal } from '../../../../../shared/hooks/useModal'
import useServiceParams from '../../../../../shared/hooks/useServiceParams'
import useURLSearchParams from '../../../../../shared/hooks/useURLSearchParams'
import { getPickupOrdersService } from '../../../services/Pickup/get'
import { pickupCoffeeDoneService, pickupCoffeePendingService } from '../../../services/Pickup/put'
import { PickupCoffeeStatuses, type PickupCoffeeModel } from '../../../types/model/pickup'

const initialStatus = PickupCoffeeStatuses.PENDING

export default function usePickupTableView(): UsePickupTableView {
  const openModal = useModal((state) => state.openModal)
  const { handleAddParam, getParam } = useURLSearchParams()
  const params = useServiceParams()
  const currentStatus = getParam('status') as PickupCoffeeStatuses | null
  const { data, mutate, isLoading } = getPickupOrdersService(
    `${params}${currentStatus ? '' : `&status=${initialStatus}`}`,
  )

  async function handleOpenUpdateForm(pickup: PickupCoffeeModel): Promise<void> {
    try {
      const UpdateCoffeePickup = (await import('../Update')).default
      openModal(
        <UpdateCoffeePickup
          pickup={pickup}
          onSuccess={() => {
            void mutate?.()
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
    void mutate?.()
  }

  async function handleUncheckPickup(pickup: PickupCoffeeModel): Promise<void> {
    const { error } = await pickupCoffeePendingService(pickup.id)
    if (error) {
      toast.error('Não foi possível desmarcar o pedido de coleta')
      return
    }
    toast.success('Pedido de coleta desmarcado com sucesso')
    void mutate?.()
  }

  function handleChangeStatus(status: PickupCoffeeStatuses): void {
    handleAddParam('status', status)
  }

  return {
    onClickUpdate: handleOpenUpdateForm,
    onClickCheck: handleCheckPickup,
    onClickUncheck: handleUncheckPickup,
    data: data?.data,
    isLoading,
    totalPickups: data?.total ?? 0,
    handleChangeStatus,
    currentStatus,
  }
}

type UsePickupTableView = {
  onClickUpdate: (pickup: PickupCoffeeModel) => Promise<void>
  onClickCheck: (pickup: PickupCoffeeModel) => Promise<void>
  onClickUncheck: (pickup: PickupCoffeeModel) => Promise<void>
  data: PickupCoffeeModel[] | undefined
  isLoading: boolean
  totalPickups: number
  handleChangeStatus: (status: PickupCoffeeStatuses) => void
  currentStatus: PickupCoffeeStatuses | null
}
