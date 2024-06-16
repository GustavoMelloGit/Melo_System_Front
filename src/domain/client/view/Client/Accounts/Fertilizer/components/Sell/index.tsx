import { useGetClientService } from '../../../../../../service/ClientService.hooks'
import useSellFertilizerView from './useView'
import SellFertilizerView from './View'

type Props = {
  clientId: string
}
const SellFertilizer = ({ clientId }: Props): JSX.Element => {
  const { closeModal, handleSellFertilizer } = useSellFertilizerView()
  const { data } = useGetClientService(clientId)

  return (
    <SellFertilizerView
      onClose={closeModal}
      initialValues={{
        fertilizerName: '',
        fertilizerId: '',
        description: '',
        bags: 0,
        pricePerBag: 0,
        brook: data?.address.brook ?? '',
        complement: data?.address.complement ?? '',
        deliveryDate: new Date().toISOString().split('T')[0],
      }}
      onSubmit={async (values) => {
        await handleSellFertilizer(clientId, values)
      }}
    />
  )
}
export default SellFertilizer
