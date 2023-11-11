import { getClientService } from '../../../../../../service'
import useSellProductView from './useView'
import SellProductView from './View'

type Props = {
  refetch: () => void
  clientId: string
}
const SellProduct = ({ refetch, clientId }: Props): JSX.Element => {
  const { closeModal, handleSellFertilizer } = useSellProductView()
  const { data } = getClientService(clientId)

  return (
    <SellProductView
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
        refetch()
      }}
    />
  )
}
export default SellProduct
