import { Heading } from '@chakra-ui/react'
import Modal from '../../../../../shared/components/Modal'
import { useModal } from '../../../../../shared/hooks/useModal'
import StockProductForm from '../../../components/Stock/Form'
import useCreateProductView from './useView'

type Props = {
  refetch: () => void
}
const CreateProductView = ({ refetch }: Props): JSX.Element => {
  const { handleAddFertilizer } = useCreateProductView({ onSuccess: refetch })
  const closeModal = useModal((state) => state.closeModal)
  return (
    <Modal isCentered isOpen onClose={closeModal}>
      <Modal.Content>
        <Modal.Header>
          <Heading as='h1' fontSize='3xl'>
            Adicionar Produto
          </Heading>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <StockProductForm
            initialValues={{
              name: '',
              quantity: 0,
              description: '',
              cost: 0,
              sale: 0,
            }}
            onSubmit={handleAddFertilizer}
          />
        </Modal.Body>
      </Modal.Content>
    </Modal>
  )
}
export default CreateProductView
