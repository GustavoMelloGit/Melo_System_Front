import { useModal } from '../../../../../../../shared/hooks/useModal'
import { type CheckingAccountFormValues } from '../../../../../types/view/Details'

export default function useUpdateTransactionView(): UseUpdateTransactionView {
  const closeModal = useModal((state) => state.closeModal)

  async function handleUpdate(values: CheckingAccountFormValues): Promise<void> {
    console.log(values) // TODO: implement update transaction
    closeModal()
  }

  return {
    handleUpdate,
    closeModal,
  }
}

export type UseUpdateTransactionView = {
  handleUpdate: (values: CheckingAccountFormValues) => Promise<void>
  closeModal: () => void
}
