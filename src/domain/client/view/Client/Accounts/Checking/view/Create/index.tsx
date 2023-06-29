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
import { formatInputDateString } from '../../../../../../../../lib/utils/date'
import { useModal } from '../../../../../../../../shared/hooks/useModal'
import { createTransactionService } from '../../../../../../service'
import { type CheckingAccountFormValues } from '../../../../../../types/model/CheckingAccount'
import CheckingAccountForm from '../../components/Form'
import { CheckingAccountEmitter } from '../../events/CheckingAccountEmitter'

type CreateTransactionViewProps = {
  uuid: string
}
export default function CreateTransactionView({ uuid }: CreateTransactionViewProps): JSX.Element {
  const closeModal = useModal((state) => state.closeModal)

  async function handleCreateTransaction({
    date,
    ...values
  }: CheckingAccountFormValues): Promise<void> {
    const { error } = await createTransactionService(
      {
        ...values,
        date: formatInputDateString(date),
      },
      uuid,
    )
    if (error) {
      toast.error(error)
      return
    }
    toast.success('Lançamento criado com sucesso!')
    closeModal()
    CheckingAccountEmitter.emit('transactionCreated', { date, ...values })
  }

  return (
    <Modal isOpen onClose={closeModal} isCentered>
      <ModalOverlay />
      <ModalContent rounded={20}>
        <ModalCloseButton />
        <ModalHeader>
          <Heading as='h1' fontSize='3xl'>
            Novo lançamento
          </Heading>
        </ModalHeader>
        <ModalBody>
          <CheckingAccountForm
            onSubmit={handleCreateTransaction}
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
