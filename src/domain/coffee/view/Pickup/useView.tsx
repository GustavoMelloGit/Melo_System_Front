import { useModal } from '../../../../shared/hooks/useModal'
import useServiceParams from '../../../../shared/hooks/useServiceParams'
import { type GetServiceResponse } from '../../../../shared/types/utils/service'
import { getPickupOrders } from '../../services/Pickup/get'
import { type PickupCoffee } from '../../types/model/pickup'

export default function usePickupView(): UsePickupView {
  const params = useServiceParams()
  const order = getPickupOrders(params)
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

  return {
    order,
    handleOpenForm,
    handleOpenUpdateForm,
  }
}

type UsePickupView = {
  order: GetServiceResponse<PickupCoffee[]>
  handleOpenForm: () => Promise<void>
  handleOpenUpdateForm: (pickup: PickupCoffee) => Promise<void>
}
