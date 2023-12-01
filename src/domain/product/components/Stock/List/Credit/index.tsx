import { type ProductModel } from '../../../../types/Fertilizer'
import useCreditStockProductView from './useView'
import CreditStockProductView from './View'

type Props = {
  fertilizer: ProductModel
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
