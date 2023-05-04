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
import { formatInputDateToApiDate } from '../../../../../../../../lib/utils/date'
import { useModal } from '../../../../../../../../shared/hooks/useModal'
import { createTransactionService } from '../../../../../../service'
import { type CheckingAccountFormValues } from '../../../../../../types/model/CheckingAccount'
import CheckingAccountForm from '../../components/Form'

type CreateTransactionViewProps = {
  uuid: string
  refetch: () => void
}
export default function CreateTransactionView({
  uuid,
  refetch,
}: CreateTransactionViewProps): JSX.Element {
  const closeModal = useModal((state) => state.closeModal)

  async function handleCreateTransaction({
    date,
    ...values
  }: CheckingAccountFormValues): Promise<void> {
    const { error } = await createTransactionService(
      {
        ...values,
        date: formatInputDateToApiDate(date),
      },
      uuid,
    )
    if (error) {
      toast.error(error)
      return
    }
    toast.success('Lançamento criado com sucesso!')
    closeModal()
    refetch()
  }

  return (
    <Modal isOpen onClose={closeModal} isCentered>
      <ModalOverlay />
      <ModalContent pb={8} rounded={20}>
        <ModalCloseButton />
        <ModalHeader>
          <Heading fontSize='3xl'>Novo lançamento</Heading>
        </ModalHeader>
        <ModalBody>
          <CheckingAccountForm
            onSubmit={handleCreateTransaction}
            submitText='Salvar'
            initialValues={{
              date: new Date().toISOString().split('T')[0],
              description: '',
              value: 0,
            }}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
