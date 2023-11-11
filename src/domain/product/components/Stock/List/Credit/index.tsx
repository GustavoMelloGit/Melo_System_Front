import { type FertilizerModel } from '../../../../../fertilizer/types/model/Fertilizer'
import useCreditStockProductView from './useView'
import CreditStockProductView from './View'

type Props = {
  fertilizer: FertilizerModel
  refetch: () => void
}
export default function CreditStockProduct({ fertilizer, refetch }: Props): JSX.Element {
  const { closeModal, handleCreditFertilizer } = useCreditStockProductView()

  return (
    <CreditStockProductView
      closeModal={closeModal}
      onSubmit={async (values) => {
        await handleCreditFertilizer(fertilizer.id, values)
        refetch()
      }}
      initialValues={{
        quantity: fertilizer.quantity,
      }}
    />
  )
}
