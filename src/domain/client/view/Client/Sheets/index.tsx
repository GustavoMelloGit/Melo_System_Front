import { Heading } from '@chakra-ui/layout'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal'
import { useModal } from '../../../../../shared/hooks/useModal'
import { getSheetsService } from '../../../../coffee/services/Sheets'

type Props = {
  clientId: string
}
export default function ClientSheetsView({ clientId }: Props): JSX.Element {
  const { data } = getSheetsService({ params: `clientId=${clientId}` })
  const closeModal = useModal((state) => state.closeModal)
  console.log(data)

  return (
    <Modal isOpen={true} isCentered onClose={closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>
          <Heading as='h1' fontSize='3xl'>
            Folhas
          </Heading>
        </ModalHeader>
        <ModalBody pb={8}></ModalBody>
      </ModalContent>
    </Modal>
  )
}
