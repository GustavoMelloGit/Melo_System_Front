import {
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { useModal } from '../../../../../../../../shared/hooks/useModal'
import EscolhaFormView from '../../components/Form'
import useCreateEscolhaView from './useView'

const CreateEscolhaView = (): JSX.Element => {
  const closeModal = useModal((state) => state.closeModal)
  const { handleCreateEscolha } = useCreateEscolhaView()
  return (
    <Modal onClose={closeModal} isOpen isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>
          <Heading as='h1' fontSize='3xl'>
            Creditar Escolha
          </Heading>
        </ModalHeader>
        <ModalBody pb={8}>
          <EscolhaFormView
            onSubmit={handleCreateEscolha}
            initialValues={{
              date: new Date().toISOString().split('T')[0],
              value: 0,
              description: '',
            }}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
export default CreateEscolhaView
