import { useParams } from 'react-router-dom'
import { shallow } from 'zustand/shallow'
import { useModal } from '../../../../../../../shared/hooks/useModal'
import useServiceParams from '../../../../../../../shared/hooks/useServiceParams'
import { getTransactionsService } from '../../../../../service'
import { type TransactionModel } from '../../../../../types/model/Transaction'
import FeeModal from '../components/FeeModal'
import CreateTransactionView from '../Create'
import { useFeeStore } from '../stores/useFeeStore'

export default function useListTransactionsView(): UseListTransactionsView {
  const openModal = useModal((state) => state.openModal)
  const [selectionMode, setSelectionMode] = useFeeStore(
    (state) => [state.selectionMode, state.setSelectionMode],
    shallow,
  )
  const { uuid } = useParams()
  const params = useServiceParams()
  const { isLoading, mutate, data, total } = getTransactionsService(uuid ?? '', params)

  function refetchData(): void {
    void mutate?.()
  }

  function handleAddTransaction(): void {
    openModal(<CreateTransactionView refetch={refetchData} uuid={uuid ?? ''} />)
  }

  function handleCalculateFee(): void {
    if (selectionMode) {
      openModal(<FeeModal />)
      setSelectionMode(false)
    } else setSelectionMode(true)
  }

  return {
    data: data ?? [],
    isLoading,
    total: total ?? 0,
    handleAddTransaction,
    refetchData,
    handleCalculateFee,
  }
}

type UseListTransactionsView = {
  data: TransactionModel[]
  isLoading: boolean
  total: number
  handleAddTransaction: () => void
  refetchData: () => void
  handleCalculateFee: () => void
}
