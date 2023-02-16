import {
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { formatDate } from '../../../../../../../lib/utils/formatters'
import { type TransactionModel } from '../../../../../types/model/Transaction'
import CheckingAccountForm from '../components/Form'
import useUpdateTransactionView from './useView'

type UpdateTransactionViewProps = {
  transaction: TransactionModel
}
export default function UpdateTransactionView({
  transaction,
}: UpdateTransactionViewProps): JSX.Element {
  const { closeModal, handleUpdate } = useUpdateTransactionView()
  return (
    <Modal isOpen onClose={closeModal} isCentered>
      <ModalOverlay />
      <ModalContent p={8} rounded={20}>
        <ModalHeader>
          <Heading fontSize='3xl'>Atualizar lançamento</Heading>
        </ModalHeader>
        <ModalBody>
          <CheckingAccountForm
            onSubmit={handleUpdate}
            submitText='Salvar'
            initialValues={{
              date: formatDate(transaction.date, 'yyyy-MM-dd'),
              description: transaction.description,
              value: transaction.value,
              isDebit: transaction.value < 0,
            }}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
