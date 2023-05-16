import { useParams } from 'react-router-dom'
import { getDefaultSortParams } from '../../../../../../../../lib/utils/utils'
import { useModal } from '../../../../../../../../shared/hooks/useModal'
import useServiceParams from '../../../../../../../../shared/hooks/useServiceParams'
import { type CoffeeTransactionModel } from '../../../../../../types/model/Transaction'
import { getCoffeeAccountService } from '../../service/get'

export default function useCoffeeAccountView(): UseCoffeeAccountView {
  const { uuid } = useParams()
  const params = useServiceParams()
  const { data, isLoading, total, mutate } = getCoffeeAccountService(
    uuid,
    params || getDefaultSortParams('date'),
  )

  async function handleOpenCreateCoffee(): Promise<void> {
    if (!uuid) return
    const openModal = useModal.getState().openModal
    const CreateCoffeeView = (await import('../Create')).default
    openModal(<CreateCoffeeView clientId={uuid} refetch={mutate} />)
  }

  return {
    data: data ?? [],
    isLoading,
    total: total ?? 0,
    handleOpenCreateCoffee,
  }
}

type UseCoffeeAccountView = {
  data: CoffeeTransactionModel[]
  isLoading: boolean
  total: number
  handleOpenCreateCoffee: () => void
}
