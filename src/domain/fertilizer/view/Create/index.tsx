import {
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
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
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading as='h1' fontSize='3xl'>
            Adicionar adubo
          </Heading>
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody>
          <FertilizerForm
            initialValues={{
              name: '',
              description: '',
            }}
            onSubmit={handleAddFertilizer}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
export default CreateFertilizerView
