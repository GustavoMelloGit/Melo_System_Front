import { Heading } from '@chakra-ui/react'
import Modal from '../../../../../../../../shared/components/Modal'
import EscolhaFormView from '../../components/Form'
import useCreateEscolhaView from './useView'

type Props = {
  clientId: string
}
const CreateEscolhaView = ({ clientId }: Props): JSX.Element => {
  const { handleCreateEscolha, closeModal } = useCreateEscolhaView({ clientId })
  return (
    <Modal onClose={closeModal} isOpen isCentered>
      <Modal.Content maxW={600}>
        <Modal.CloseButton />
        <Modal.Header>
          <Heading as='h1' fontSize='3xl'>
            Creditar Escolha
          </Heading>
        </Modal.Header>
        <Modal.Body pb={8}>
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
        </Modal.Body>
      </Modal.Content>
    </Modal>
  )
}
export default CreateEscolhaView
