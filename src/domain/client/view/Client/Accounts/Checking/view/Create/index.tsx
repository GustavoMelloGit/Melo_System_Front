import { Heading } from '@chakra-ui/react'
import { toast } from 'react-hot-toast'
import { dateInputToApiDate } from '../../../../../../../../lib/utils/date'
import Modal from '../../../../../../../../shared/components/Modal'
import { useModal } from '../../../../../../../../shared/hooks/useModal'
import { ClientService } from '../../../../../../service/ClientService'
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
    const { error } = await ClientService.createCurrencyTransaction(
      {
        ...values,
        date: dateInputToApiDate(date),
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
    <Modal isOpen onClose={closeModal}>
      <Modal.Content rounded={20}>
        <Modal.CloseButton />
        <Modal.Header>
          <Heading as='h1' fontSize='3xl'>
            Novo lançamento
          </Heading>
        </Modal.Header>
        <Modal.Body>
          <CheckingAccountForm
            onSubmit={handleCreateTransaction}
            initialValues={{
              date: new Date().toISOString().split('T')[0],
              description: '',
              value: 0,
            }}
          />
        </Modal.Body>
      </Modal.Content>
    </Modal>
  )
}
