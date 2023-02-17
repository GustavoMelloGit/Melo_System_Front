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
import { useFeeStore } from '../../stores/useFeeStore'

export default function FeeModal(): JSX.Element {
  const closeModal = useModal((state) => state.closeModal)
  const setSelectedFees = useFeeStore((state) => state.setSelectedFees)

  function handleCloseModal(): void {
    setSelectedFees([])
    closeModal()
  }

  return (
    <Modal isOpen isCentered onClose={handleCloseModal}>
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
