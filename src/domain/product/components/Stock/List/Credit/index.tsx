import { ProductEmitter } from '../../../../events/ProductEmitter'
import { type ProductModel } from '../../../../types/Product'
import useCreditStockProductView from './useView'
import CreditStockProductView from './View'

type Props = {
  product: ProductModel
}
export default function CreditStockProduct({ product }: Props): JSX.Element {
  const { closeModal, handleCreditFertilizer } = useCreditStockProductView()

  return (
    <CreditStockProductView
      closeModal={closeModal}
      onSubmit={async (values) => {
        await handleCreditFertilizer(product.id, values)
        ProductEmitter.emit('productCredited', product.id)
      }}
      initialValues={{
        quantity: product.quantity,
      }}
    />
  )
}
