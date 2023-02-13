import {
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { format } from 'date-fns'
import { toast } from 'react-hot-toast'
import { useModal } from '../../../../../../../shared/hooks/useModal'
import { createTransactionService } from '../../../../../service'
import { type CheckingAccountFormValues } from '../../../../../types/view/Details'
import CheckingAccountForm from '../components/Form'

type CreateTransactionViewProps = {
  uuid: string
  refetch: () => void
}
export default function CreateTransactionView({
  uuid,
  refetch,
}: CreateTransactionViewProps): JSX.Element {
  const closeModal = useModal((state) => state.closeModal)

  async function handleCreateTransaction(values: CheckingAccountFormValues): Promise<void> {
    const { error } = await createTransactionService(values, uuid)
    if (error) {
      toast.error(error)
    }
    closeModal()
    refetch()
  }

  return (
    <Modal isOpen onClose={closeModal} isCentered>
      <ModalOverlay />
      <ModalContent p={8} rounded={20}>
        <ModalHeader>
          <Heading fontSize='3xl'>Novo lançamento</Heading>
        </ModalHeader>
        <ModalBody>
          <CheckingAccountForm
            onSubmit={handleCreateTransaction}
            submitText='Salvar'
            initialValues={{
              date: format(new Date(), 'yyyy-MM-dd'),
              description: '',
              value: 0.01,
            }}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
