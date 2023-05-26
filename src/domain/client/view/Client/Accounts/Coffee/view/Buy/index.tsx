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
import BuyCoffeeFormView from '../../components/BuyForm'

const BuyCoffeeView = (): JSX.Element => {
  const closeModal = useModal((state) => state.closeModal)
  return (
    <Modal isOpen isCentered onClose={closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>
          <Heading as='h1' fontSize='3xl'>
            Comprar café
          </Heading>
        </ModalHeader>
        <ModalBody>
          <BuyCoffeeFormView
            onSubmit={console.log}
            initialValues={{
              address: '',
              coffeeType: 'bica_corrida',
              bags: 0,
              bebida: 'duro',
              shouldSetOrder: false,
              valuePerBag: 0,
              weight: 0,
            }}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
export default BuyCoffeeView
