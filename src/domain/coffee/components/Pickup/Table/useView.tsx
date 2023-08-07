import { toast } from 'react-hot-toast'
import { useModal } from '../../../../../shared/hooks/useModal'
import useURLSearchParams from '../../../../../shared/hooks/useURLSearchParams'
import { PickupEmitter } from '../../../events/pickup'
import { pickupCoffeeDoneService, pickupCoffeePendingService } from '../../../services/Pickup/put'
import { type PickupCoffeeModel, type PickupCoffeeStatuses } from '../../../types/model/pickup'

export default function usePickupTableView(): UsePickupTableView {
  const openModal = useModal((state) => state.openModal)
  const { handleAddParam, getParam } = useURLSearchParams()
  const currentStatus = getParam('status') as PickupCoffeeStatuses | null

  async function handleOpenUpdateForm(pickup: PickupCoffeeModel): Promise<void> {
    const UpdateCoffeePickup = (await import('../Update')).default
    openModal(<UpdateCoffeePickup pickup={pickup} />)
  }

  async function handleCheckPickup(pickup: PickupCoffeeModel): Promise<void> {
    const { error } = await pickupCoffeeDoneService(pickup.id)
    if (error) {
      toast.error('Não foi possível finalizar o pedido de coleta')
      return
    }
    toast.success('Pedido de coleta finalizado com sucesso')
    PickupEmitter.emit('pickupChecked', pickup)
  }

  async function handleUncheckPickup(pickup: PickupCoffeeModel): Promise<void> {
    const { error } = await pickupCoffeePendingService(pickup.id)
    if (error) {
      toast.error('Não foi possível desmarcar o pedido de coleta')
      return
    }
    toast.success('Pedido de coleta desmarcado com sucesso')
    PickupEmitter.emit('pickupUnchecked', pickup)
  }

  function handleChangeStatus(status: PickupCoffeeStatuses): void {
    handleAddParam('status', status)
  }

  return {
    onClickUpdate: handleOpenUpdateForm,
    onClickCheck: handleCheckPickup,
    onClickUncheck: handleUncheckPickup,
    handleChangeStatus,
    currentStatus,
  }
}

type UsePickupTableView = {
  onClickUpdate: (pickup: PickupCoffeeModel) => Promise<void>
  onClickCheck: (pickup: PickupCoffeeModel) => Promise<void>
  onClickUncheck: (pickup: PickupCoffeeModel) => Promise<void>
  handleChangeStatus: (status: PickupCoffeeStatuses) => void
  currentStatus: PickupCoffeeStatuses | null
}
