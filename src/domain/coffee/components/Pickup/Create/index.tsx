import { toast } from 'react-hot-toast'
import { useModal } from '../../../../../shared/hooks/useModal'
import { PickupEmitter } from '../../../events/pickup'
import { createPickupService } from '../../../services/Pickup/post'
import { type PickupFormValues } from '../../../types/model/pickup'
import CoffeePickupForm from '../Form'

export default function CreateCoffeePickup(): JSX.Element {
  const closeModal = useModal((state) => state.closeModal)

  async function handleCreateCoffeePickup(values: PickupFormValues): Promise<void> {
    const { error, data } = await createPickupService({
      ...values,
      bags: Number(values.bags),
    })
    if (error ?? !data) {
      toast.error(error)
      return
    }
    toast.success('Criado com sucesso!')
    PickupEmitter.emit('pickupCreated', data)
    closeModal()
  }

  return (
    <CoffeePickupForm
      onSubmit={handleCreateCoffeePickup}
      initialValues={{
        bags: 0,
        clientId: '',
        clientName: '',
        brook: '',
        complement: '',
      }}
    />
  )
}
