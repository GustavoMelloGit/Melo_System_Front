import { useParams } from 'react-router-dom'
import { useModal } from '../../../../../../../shared/hooks/useModal'
import useServiceParams from '../../../../../../../shared/hooks/useServiceParams'
import { createMockListTransaction } from '../../../../../mock/transaction'
import { getTransactionsService } from '../../../../../service'
import { type TransactionModel } from '../../../../../types/model/Transaction'
import CreateTransactionView from '../Create'

export default function useListTransactionsView(): UseListTransactionsView {
  const openModal = useModal((state) => state.openModal)
  const { uuid } = useParams()
  const params = useServiceParams()
  const { isLoading, mutate } = getTransactionsService(uuid ?? '', params)
  const data = createMockListTransaction() // TODO: Remove mock
  const total = data.length

  function refetchData(): void {
    void mutate?.()
  }

  function handleAddTransaction(): void {
    openModal(<CreateTransactionView refetch={refetchData} uuid={uuid ?? ''} />)
  }

  return {
    data: data ?? [],
    isLoading,
    total: total ?? 0,
    handleAddTransaction,
    refetchData,
  }
}

type UseListTransactionsView = {
  data: TransactionModel[]
  isLoading: boolean
  total: number
  handleAddTransaction: () => void
  refetchData: () => void
}
