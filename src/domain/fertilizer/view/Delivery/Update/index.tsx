import { toast } from 'react-hot-toast'
import { useModal } from '../../../../../shared/hooks/useModal'
import FertilizerDeliveryForm from '../../../components/Delivery/Form'
import { updateFertilizerDeliveryService } from '../../../services/put'
import { type FertilizerDeliveryModel } from '../../../types/model/Delivery'

type Props = {
  refetch: () => void
  pickup: FertilizerDeliveryModel
}
export default function UpdateFertilizerDelivery({ refetch, pickup }: Props): JSX.Element {
  const closeModal = useModal((state) => state.closeModal)
  return (
    <FertilizerDeliveryForm
      initialValues={{
        amount: pickup.amount,
        clientName: pickup.clientName,
        brook: pickup.brook,
        complement: pickup.complement,
        fertilizerId: pickup.fertilizer.id,
      }}
      onSubmit={async (values) => {
        const { error } = await updateFertilizerDeliveryService(values)
        if (error) {
          toast.error(error)
          return
        }
        toast.success('Adubo adicionado com sucesso')
        refetch()
        closeModal()
      }}
    />
  )
}
