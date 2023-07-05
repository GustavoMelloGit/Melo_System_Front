import {
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
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
      <ModalOverlay />
      <ModalContent maxW={500}>
        <ModalCloseButton />
        <ModalHeader>
          <Heading as='h1' fontSize='3xl'>
            Comprar escolha
          </Heading>
        </ModalHeader>
        <ModalBody>
          <BuyEscolhaFormView onSubmit={handleBuyCoffee} initialValues={initialValues} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
export default BuyEscolhaView
