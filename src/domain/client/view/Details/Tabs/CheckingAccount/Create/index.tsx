import {
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { toast } from 'react-hot-toast'
import { type KeyedMutator } from 'swr'
import { useModal } from '../../../../../../../shared/hooks/useModal'
import { createTransactionService } from '../../../../../service'
import { type TransactionModel } from '../../../../../types/model/Transaction'
import { type CheckingAccountFormValues } from '../../../../../types/view/Details'
import CheckingAccountForm from '../components/Form'

type CreateTransactionViewProps = {
  uuid: string
  refetch: KeyedMutator<TransactionModel[]> | undefined
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
    void refetch?.()
  }

  return (
    <Modal isOpen onClose={closeModal} isCentered>
      <ModalOverlay />
      <ModalContent p={8} rounded={20}>
        <ModalHeader>
          <Heading fontSize='3xl'>Novo lançamento</Heading>
        </ModalHeader>
        <ModalBody>
          <CheckingAccountForm onSubmit={handleCreateTransaction} submitText='Salvar' />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
