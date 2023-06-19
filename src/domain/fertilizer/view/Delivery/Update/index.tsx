import { format } from 'date-fns'
import { toast } from 'react-hot-toast'
import { useModal } from '../../../../../shared/hooks/useModal'
import FertilizerDeliveryForm from '../../../components/Delivery/Form'
import { updateFertilizerDeliveryService } from '../../../services/put'
import { type FertilizerDeliveryModel } from '../../../types/model/Delivery'

type Props = {
  refetch: () => void
  delivery: FertilizerDeliveryModel
}
export default function UpdateFertilizerDelivery({ refetch, delivery }: Props): JSX.Element {
  const closeModal = useModal((state) => state.closeModal)
  return (
    <FertilizerDeliveryForm
      initialValues={{
        amount: delivery.amount,
        clientName: delivery.clientName,
        brook: delivery.brook,
        complement: delivery.complement,
        fertilizerId: delivery.fertilizer.id,
        date: format(delivery.date, 'yyyy-MM-dd'),
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
