import { toast } from 'react-hot-toast'
import { useModal } from '../../../../../shared/hooks/useModal'
import { PickupEmitter } from '../../../events/pickup'
import { PickupService } from '../../../services/Pickup'
import { type PickupCoffeeModel, type PickupFormValues } from '../../../types/model/pickup'
import CoffeePickupForm from '../Form'

type Props = {
  pickup: PickupCoffeeModel
}
export default function UpdateCoffeePickup({ pickup }: Props): JSX.Element {
  const closeModal = useModal((state) => state.closeModal)
  async function handleUpdateCoffeePickup(values: PickupFormValues): Promise<void> {
    const { error, data } = await PickupService.update(pickup?.id, {
      ...values,
      bags: Number(values.bags),
    })
    if (error ?? !data) {
      toast.error(error)
      return
    }
    toast.success('Atualizado com sucesso!')
    PickupEmitter.emit('pickupUpdated', data)
    closeModal()
  }
  return (
    <CoffeePickupForm
      onSubmit={handleUpdateCoffeePickup}
      initialValues={{
        clientId: pickup.client.id,
        clientName: pickup.client.name,
        bags: pickup.bags,
        brook: pickup.brook,
        complement: pickup.complement,
      }}
    />
  )
}
