import { Image, Modal, ModalCloseButton, ModalContent, ModalOverlay } from '@chakra-ui/react'
import { useModal } from '../hooks/useModal'

type Props = {
  imageSrc: string
}
export default function ZoomImageModal({ imageSrc }: Props): JSX.Element {
  const closeModal = useModal((state) => state.closeModal)
  return (
    <Modal isOpen={true} onClose={closeModal} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton top={-10} right={-10} />
        <Image src={imageSrc} alt='Foto de perfil do cliente' />
      </ModalContent>
    </Modal>
  )
}
