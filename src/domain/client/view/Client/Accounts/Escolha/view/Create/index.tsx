import {
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { type EscolhaTransactionModel } from '../../../../../../types/model/Transaction'
import EscolhaFormView from '../../components/Form'
import useCreateEscolhaView from './useView'

type Props = {
  clientId: string
  onSuccess?: (data: EscolhaTransactionModel) => void
}
const CreateEscolhaView = ({ clientId, onSuccess }: Props): JSX.Element => {
  const { handleCreateEscolha, closeModal } = useCreateEscolhaView({ clientId, onSuccess })
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
              bags: 0,
              weight: 0,
              details: {
                foulness: 0,
                utilization: 0,
              },
              description: '',
            }}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
export default CreateEscolhaView
