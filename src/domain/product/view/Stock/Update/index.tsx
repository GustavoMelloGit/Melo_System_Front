import { Heading } from '@chakra-ui/react'
import currency from 'currency.js'
import Modal from '../../../../../shared/components/Modal'
import { useModal } from '../../../../../shared/hooks/useModal'
import StockProductForm from '../../../components/Stock/Form'
import { type ProductModel } from '../../../types/Product'
import useUpdateProductView from './useView'

type Props = {
  product: ProductModel
}
const UpdateProductView = ({ product }: Props): JSX.Element => {
  const { updateProductHandler } = useUpdateProductView()
  const closeModal = useModal((state) => state.closeModal)

  return (
    <Modal isCentered isOpen onClose={closeModal}>
      <Modal.Content>
        <Modal.Header>
          <Heading as='h1' fontSize='3xl'>
            Editar Produto
          </Heading>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <StockProductForm
            initialValues={{
              name: product.name,
              quantity: product.quantity,
              description: product.description,
              cost: currency(product.cost).divide(100).value,
              sale: currency(product.sale).divide(100).value,
            }}
            onSubmit={async (values) => {
              await updateProductHandler(product.id, values)
            }}
            submitButtonLabel='Salvar'
          />
        </Modal.Body>
      </Modal.Content>
    </Modal>
  )
}
export default UpdateProductView
