import {
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { toast } from 'react-hot-toast'
import { dateInputToApiDate } from '../../../../../../../../lib/utils/date'
import { useModal } from '../../../../../../../../shared/hooks/useModal'
import SacariaFormView from '../../components/Form'
import { createSacariaService } from '../../service/post'
import { type SacariaFormValues } from '../../types/sacaria'

type Props = {
  clientUuid: string
  refetch: () => void
}
const CreateSacariaView = ({ clientUuid, refetch }: Props): JSX.Element => {
  const closeModal = useModal((state) => state.closeModal)
  async function handleCreateSacaria({ date, ...values }: SacariaFormValues): Promise<void> {
    const { error } = await createSacariaService(
      {
        ...values,
        date: dateInputToApiDate(date),
      },
      clientUuid,
    )
    if (error) {
      toast.error(error)
      return
    }
    toast.success('Sacaria creditada com sucesso!')
    refetch()
    closeModal()
  }
  return (
    <Modal isCentered onClose={closeModal} isOpen>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>
          <Heading as='h1' fontSize='3xl'>
            Conta Sacaria
          </Heading>
        </ModalHeader>
        <ModalBody pb={8}>
          <SacariaFormView
            onSubmit={handleCreateSacaria}
            initialValues={{ date: new Date().toISOString().split('T')[0], value: 0 }}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
export default CreateSacariaView
