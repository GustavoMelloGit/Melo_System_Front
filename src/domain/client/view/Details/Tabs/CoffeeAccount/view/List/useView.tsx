import { useParams } from 'react-router-dom'
import { type CoffeeTransactionModel } from '../../../../../../types/model/Transaction'
import { getCoffeeAccountService } from '../../service/get'

export default function useCoffeeAccountView(): UseCoffeeAccountView {
  const { uuid } = useParams()
  const { data, isLoading, total } = getCoffeeAccountService(uuid)
  return {
    data: data ?? [],
    isLoading,
    total: total ?? 0,
  }
}

type UseCoffeeAccountView = {
  data: CoffeeTransactionModel[]
  isLoading: boolean
  total: number
}
