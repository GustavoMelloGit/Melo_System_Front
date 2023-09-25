import { Heading } from '@chakra-ui/react'
import Modal from '../../../../shared/components/Modal'
import { useModal } from '../../../../shared/hooks/useModal'
import FertilizerForm from '../../components/Form'
import useCreateFertilizerView from './useView'

type Props = {
  refetch: () => void
}
const CreateFertilizerView = ({ refetch }: Props): JSX.Element => {
  const { handleAddFertilizer } = useCreateFertilizerView({ onSuccess: refetch })
  const closeModal = useModal((state) => state.closeModal)
  return (
    <Modal isCentered isOpen onClose={closeModal}>
      <Modal.Content>
        <Modal.Header>
          <Heading as='h1' fontSize='3xl'>
            Adicionar adubo
          </Heading>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <FertilizerForm
            initialValues={{
              name: '',
              quantity: 0,
              description: '',
            }}
            onSubmit={handleAddFertilizer}
          />
        </Modal.Body>
      </Modal.Content>
    </Modal>
  )
}
export default CreateFertilizerView
