import { toast } from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import { createTransactionService } from '../../../../../service'
import { type CheckingAccountFormValues } from '../../../../../types/view/Details'
import CheckingAccountForm from '../components/Form'

export default function CreateTransactionView(): JSX.Element {
  const { uuid } = useParams()
  async function handleCreateTransaction(values: CheckingAccountFormValues): Promise<void> {
    const { error } = await createTransactionService(values, uuid ?? '')
    if (error) {
      toast.error(error)
    }
  }
  return <CheckingAccountForm onSubmit={handleCreateTransaction} submitText='Salvar' />
}
