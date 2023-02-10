import { useParams } from 'react-router-dom'
import { type KeyedMutator } from 'swr'
import { useModal } from '../../../../../../../shared/hooks/useModal'
import useServiceParams from '../../../../../../../shared/hooks/useServiceParams'
import { getTransactionsService } from '../../../../../service'
import { type TransactionModel } from '../../../../../types/model/Transaction'
import CreateTransactionView from '../Create'

export default function useListTransactionsView(): UseListTransactionsView {
  const openModal = useModal((state) => state.openModal)
  const { uuid } = useParams()
  const params = useServiceParams()
  const { data, isLoading, total, mutate } = getTransactionsService(uuid ?? '', params)

  function handleAddTransaction(): void {
    openModal(<CreateTransactionView refetch={mutate} uuid={uuid ?? ''} />)
  }

  return {
    data: data ?? [],
    isLoading,
    total: total ?? 0,
    handleAddTransaction,
    mutate,
  }
}

type UseListTransactionsView = {
  data: TransactionModel[]
  isLoading: boolean
  total: number
  handleAddTransaction: () => void
  mutate: KeyedMutator<TransactionModel[]> | undefined
}
