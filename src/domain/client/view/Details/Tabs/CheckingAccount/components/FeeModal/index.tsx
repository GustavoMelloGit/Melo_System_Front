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

export default function FeeModal(): JSX.Element {
  const closeModal = useModal((state) => state.closeModal)
  return (
    <Modal isOpen isCentered onClose={closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>
          <Heading fontSize='3xl'>Calcular juros</Heading>
        </ModalHeader>
        <ModalBody>
          <p>Em breve</p>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
