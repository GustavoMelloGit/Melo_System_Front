import { toast } from 'react-hot-toast'
import { useModal } from '../../../../shared/hooks/useModal'
import useServiceParams from '../../../../shared/hooks/useServiceParams'
import { type GetServiceResponse } from '../../../../shared/types/utils/service'
import { getPickupOrders } from '../../services/Pickup/get'
import { pickupCoffeeDoneService } from '../../services/Pickup/put'
import { PickupCoffeeStatuses, type PickupCoffee } from '../../types/model/pickup'

export default function usePickupView(): UsePickupView {
  const params = useServiceParams()
  const order = getPickupOrders(`${params}&status=${PickupCoffeeStatuses.PENDING}`)
  const openModal = useModal((state) => state.openModal)

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

  async function handleOpenUpdateForm(pickup: PickupCoffee): Promise<void> {
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

  async function handleCheckPickup(pickup: PickupCoffee): Promise<void> {
    const { error } = await pickupCoffeeDoneService(pickup.id)
    if (error) {
      toast.error('Não foi possível finalizar o pedido de coleta')
      return
    }
    toast.success('Pedido de coleta finalizado com sucesso')
    void order.mutate?.()
  }

  return {
    order,
    handleOpenForm,
    handleOpenUpdateForm,
    handleCheckPickup,
  }
}

type UsePickupView = {
  order: GetServiceResponse<PickupCoffee[]>
  handleOpenForm: () => Promise<void>
  handleOpenUpdateForm: (pickup: PickupCoffee) => Promise<void>
  handleCheckPickup: (pickup: PickupCoffee) => Promise<void>
}
