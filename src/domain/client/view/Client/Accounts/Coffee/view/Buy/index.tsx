import {
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import BuyCoffeeFormView from '../../components/BuyForm'
import useBuyCoffeeView from './useView'

type Props = {
  clientId: string
  refetch: () => void
}
const BuyCoffeeView = ({ clientId, refetch }: Props): JSX.Element => {
  const { closeModal, handleBuyCoffee, initialValues } = useBuyCoffeeView({ clientId, refetch })
  return (
    <Modal isOpen isCentered onClose={closeModal}>
      <ModalOverlay />
      <ModalContent maxW={600}>
        <ModalCloseButton />
        <ModalHeader>
          <Heading as='h1' fontSize='3xl'>
            Comprar café
          </Heading>
        </ModalHeader>
        <ModalBody>
          <BuyCoffeeFormView onSubmit={handleBuyCoffee} initialValues={initialValues} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
export default BuyCoffeeView
