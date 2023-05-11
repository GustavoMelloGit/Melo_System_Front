import { useParams } from 'react-router-dom'
import { getDefaultSortParams } from '../../../../../../../../lib/utils/utils'
import useServiceParams from '../../../../../../../../shared/hooks/useServiceParams'
import { type CoffeeTransactionModel } from '../../../../../../types/model/Transaction'
import { getCoffeeAccountService } from '../../service/get'

export default function useCoffeeAccountView(): UseCoffeeAccountView {
  const { uuid } = useParams()
  const params = useServiceParams()
  const { data, isLoading, total } = getCoffeeAccountService(
    uuid,
    params || getDefaultSortParams('date'),
  )

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
