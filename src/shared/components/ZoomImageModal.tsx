import { Image } from '@chakra-ui/react'
import { useModal } from '../hooks/useModal'
import Modal from './Modal'

type Props = {
  imageSrc: string
}
export default function ZoomImageModal({ imageSrc }: Props): JSX.Element {
  const closeModal = useModal((state) => state.closeModal)
  return (
    <Modal isOpen={true} onClose={closeModal} isCentered>
      <Modal.Content>
        <Modal.CloseButton top={-10} right={-10} />
        <Image src={imageSrc} alt='Foto de perfil do cliente' />
      </Modal.Content>
    </Modal>
  )
}
