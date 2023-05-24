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
          <p>Formulario de compra de café</p>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
export default BuyCoffeeView
