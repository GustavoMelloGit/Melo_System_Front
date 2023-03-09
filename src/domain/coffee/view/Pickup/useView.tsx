import { useModal } from '../../../../shared/hooks/useModal'
import { type GetServiceResponse } from '../../../../shared/types/utils/service'
import { getPickupOrders } from '../../services/Pickup/get'
import { type PickupCoffee } from '../../types/pickup'

export default function usePickupView(): UsePickupView {
  const order = getPickupOrders()
  const openModal = useModal((state) => state.openModal)

  async function handleOpenForm(): Promise<void> {
    try {
      const CoffePickupForm = (await import('../../components/Pickup/Form')).default
      openModal(
        <CoffePickupForm
          onSubmit={async (values) => {
            console.log(values)
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
  }
}

type UsePickupView = {
  order: GetServiceResponse<PickupCoffee[]>
  handleOpenForm: () => Promise<void>
}
