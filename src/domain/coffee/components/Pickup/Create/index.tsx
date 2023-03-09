import { toast } from 'react-hot-toast'
import { useModal } from '../../../../../shared/hooks/useModal'
import { createPickupService } from '../../../services/Pickup/post'
import { type PickupFormValues } from '../../../types/model/pickup'
import CoffeePickupForm from '../Form'

type Props = {
  onSuccess?: () => void
}
export default function CreateCoffeePickup({ onSuccess }: Props): JSX.Element {
  const closeModal = useModal((state) => state.closeModal)

  async function handleCreateCoffeePickup(values: PickupFormValues): Promise<void> {
    const { error } = await createPickupService({
      ...values,
      bags: Number(values.bags),
    })
    if (error) {
      toast.error(error)
      return
    }
    toast.success('Criado com sucesso!')
    onSuccess?.()
    closeModal()
  }

  return <CoffeePickupForm onSubmit={handleCreateCoffeePickup} />
}
