import { useParams } from 'react-router-dom'
import { useModal } from '../../../../../../../../shared/hooks/useModal'
import useServiceParams from '../../../../../../../../shared/hooks/useServiceParams'
import { getTransactionsService } from '../../../../../../service'
import { type CurrencyTransactionModel } from '../../../../../../types/model/Transaction'
import CreateTransactionView from '../Create'

export default function useListTransactionsView(): UseListTransactionsView {
  const openModal = useModal((state) => state.openModal)
  const { uuid } = useParams()
  const params = useServiceParams()
  const { isLoading, mutate, data } = getTransactionsService(uuid ?? '', params)

  function refetchData(): void {
    void mutate?.()
  }

  function handleAddTransaction(): void {
    openModal(<CreateTransactionView refetch={refetchData} uuid={uuid ?? ''} />)
  }

  return {
    data: data?.data ?? [],
    isLoading,
    total: data?.total ?? 0,
    handleAddTransaction,
    refetchData,
  }
}

type UseListTransactionsView = {
  data: CurrencyTransactionModel[]
  isLoading: boolean
  total: number
  handleAddTransaction: () => void
  refetchData: () => void
}
