import { toast } from 'react-hot-toast'
import { useModal } from '../../../../../shared/hooks/useModal'
import { updatePickupService } from '../../../services/Pickup/put'
import { type PickupCoffee, type PickupFormValues } from '../../../types/model/pickup'
import CoffeePickupForm from '../Form'

type Props = {
  onSuccess?: () => void
  pickup: PickupCoffee
}
export default function UpdateCoffeePickup({ pickup, onSuccess }: Props): JSX.Element {
  const closeModal = useModal((state) => state.closeModal)
  async function handleUpdateCoffeePickup(values: PickupFormValues): Promise<void> {
    const { error } = await updatePickupService(pickup?.id, {
      ...values,
      bags: Number(values.bags),
    })
    if (error) {
      toast.error(error)
      return
    }
    toast.success('Atualizado com sucesso!')
    onSuccess?.()
    closeModal()
  }
  return (
    <CoffeePickupForm
      onSubmit={handleUpdateCoffeePickup}
      initialValues={{
        clientName: pickup.clientName,
        bags: pickup.bags,
        address: pickup.address,
      }}
    />
  )
}
