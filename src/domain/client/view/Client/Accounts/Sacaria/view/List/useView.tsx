import { useParams } from 'react-router-dom'
import useServiceParams from '../../../../../../../../shared/hooks/useServiceParams'
import { type CoffeeTransactionModel } from '../../../../../../types/model/Transaction'
import { getSacariaAccountService } from '../../service/get'

export default function useSacariaAccountView(): UseSacariaAccountView {
  const { uuid } = useParams()
  const params = useServiceParams()
  const { data, isLoading, total } = getSacariaAccountService(uuid, params)

  return {
    data: data ?? [],
    isLoading,
    total: total ?? 0,
  }
}

type UseSacariaAccountView = {
  data: CoffeeTransactionModel[]
  isLoading: boolean
  total: number
}
