import useSellFertilizerView from './useView'
import SellFertilizerView from './View'

type Props = {
  refetch: () => void
}
const SellFertilizer = ({ refetch }: Props): JSX.Element => {
  const { closeModal, handleSellFertilizer } = useSellFertilizerView()
  return (
    <SellFertilizerView
      onClose={closeModal}
      initialValues={{
        fertilizerId: '',
        bags: 0,
        pricePerBag: 0,
        brook: '',
        complement: '',
      }}
      onSubmit={async (values) => {
        await handleSellFertilizer('clientId', values)
        refetch()
      }}
    />
  )
}
export default SellFertilizer
