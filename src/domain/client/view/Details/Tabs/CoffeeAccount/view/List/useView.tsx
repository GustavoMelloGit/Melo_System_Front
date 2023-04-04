import { useParams } from 'react-router-dom'
import { type TransactionModel } from '../../../../../../types/model/Transaction'
import { getCoffeeAccountService } from '../../service/get'

export default function useCoffeeAccountView(): UseCoffeeAccountView {
  const { uuid } = useParams()
  const { data, isLoading } = getCoffeeAccountService(uuid)
  return {
    data: data ?? [],
    isLoading,
  }
}

type UseCoffeeAccountView = {
  data: TransactionModel[]
  isLoading: boolean
}
