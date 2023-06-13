import { getClientService } from '../../../../../../service'
import useSellFertilizerView from './useView'
import SellFertilizerView from './View'

type Props = {
  refetch: () => void
  clientId: string
}
const SellFertilizer = ({ refetch, clientId }: Props): JSX.Element => {
  const { closeModal, handleSellFertilizer } = useSellFertilizerView()
  const { data } = getClientService(clientId)

  return (
    <SellFertilizerView
      onClose={closeModal}
      initialValues={{
        fertilizerName: '',
        bags: 0,
        pricePerBag: 0,
        brook: data?.address.brook ?? '',
        complement: data?.address.complement ?? '',
      }}
      onSubmit={async (values) => {
        await handleSellFertilizer('clientId', values)
        refetch()
      }}
    />
  )
}
export default SellFertilizer
