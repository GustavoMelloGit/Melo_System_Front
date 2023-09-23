import { Heading } from '@chakra-ui/react'
import Modal from '../../../../../../../../shared/components/Modal'
import BuyEscolhaFormView from '../../components/BuyForm'
import useBuyEscolhaView from './useView'

type Props = {
  clientId: string
  refetch: () => void
}
const BuyEscolhaView = ({ clientId, refetch }: Props): JSX.Element => {
  const { closeModal, handleBuyCoffee, initialValues } = useBuyEscolhaView({ clientId, refetch })
  return (
    <Modal isOpen isCentered onClose={closeModal}>
      <Modal.Content maxW={500}>
        <Modal.CloseButton />
        <Modal.Header>
          <Heading as='h1' fontSize='3xl'>
            Comprar escolha
          </Heading>
        </Modal.Header>
        <Modal.Body>
          <BuyEscolhaFormView onSubmit={handleBuyCoffee} initialValues={initialValues} />
        </Modal.Body>
      </Modal.Content>
    </Modal>
  )
}
export default BuyEscolhaView
