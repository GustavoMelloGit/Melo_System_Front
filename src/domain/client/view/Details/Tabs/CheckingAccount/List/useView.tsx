import { useParams } from 'react-router-dom'
import useServiceParams from '../../../../../../../shared/hooks/useServiceParams'
import { getTransactionsService } from '../../../../../service'
import { type TransactionModel } from '../../../../../types/model/Transaction'

export default function useListTransactionsView(): UseListTransactionsView {
  const { uuid } = useParams()
  const params = useServiceParams()
  const { data, isLoading, total } = getTransactionsService(uuid ?? '', params)

  return {
    data: data ?? [],
    isLoading,
    total: total ?? 0,
  }
}

type UseListTransactionsView = {
  data: TransactionModel[]
  isLoading: boolean
  total: number
}
