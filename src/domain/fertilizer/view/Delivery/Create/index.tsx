import { toast } from 'react-hot-toast'
import { useModal } from '../../../../../shared/hooks/useModal'
import FertilizerDeliveryForm from '../../../components/Delivery/Form'
import { DeliveryEmitter } from '../../../events/DeliveryEmitter'
import { createFertilizerDeliveryService } from '../../../services/post'

type Props = {
  refetch: () => void
}
export default function CreateFertilizerDelivery({ refetch }: Props): JSX.Element {
  const closeModal = useModal((state) => state.closeModal)
  return (
    <FertilizerDeliveryForm
      initialValues={{
        amount: 1,
        clientName: '',
        clientId: '',
        brook: '',
        complement: '',
        fertilizerId: '',
        fertilizerName: '',
        date: new Date().toISOString().split('T')[0],
      }}
      onSubmit={async (values) => {
        const { error, data } = await createFertilizerDeliveryService(values)
        if (error) {
          toast.error(error)
          return
        }
        toast.success('Adubo adicionado com sucesso')
        refetch()
        closeModal()
        if (data) DeliveryEmitter.emit('deliveryCreated', data)
      }}
    />
  )
}
