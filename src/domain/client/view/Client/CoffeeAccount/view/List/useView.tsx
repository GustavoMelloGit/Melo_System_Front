import { useParams } from 'react-router-dom'
import useServiceParams from '../../../../../../../shared/hooks/useServiceParams'
import { type CoffeeTransactionModel } from '../../../../../types/model/Transaction'
import { getCoffeeAccountService } from '../../service/get'
import { useKgPerBag } from '../../stores/useKgPerBag'

export default function useCoffeeAccountView(): UseCoffeeAccountView {
  const { uuid } = useParams()
  const params = useServiceParams()
  const { data, isLoading, total } = getCoffeeAccountService(uuid, params)
  const setKgPerBag = useKgPerBag((state) => state.setKgPerBag)

  function handleSubmitKgPerBag(kgPerBag: number): void {
    setKgPerBag(kgPerBag)
  }

  return {
    data: data ?? [],
    isLoading,
    total: total ?? 0,
    handleSubmitKgPerBag,
  }
}

type UseCoffeeAccountView = {
  data: CoffeeTransactionModel[]
  isLoading: boolean
  total: number
  handleSubmitKgPerBag: (kgPerBag: number) => void
}
