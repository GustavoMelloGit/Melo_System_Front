import { useParams } from 'react-router-dom'
import { useModal } from '../../../../../../../../shared/hooks/useModal'
import useServiceParams from '../../../../../../../../shared/hooks/useServiceParams'
import { type CoffeeTransactionModel } from '../../../../../../types/model/Transaction'
import { getCoffeeAccountService } from '../../service/get'

export default function useCoffeeAccountView(): UseCoffeeAccountView {
  const { uuid } = useParams()
  const params = useServiceParams()
  const { data, isLoading, total, mutate } = getCoffeeAccountService(uuid, params)

  async function handleOpenCreateCoffee(): Promise<void> {
    if (!uuid) return
    const openModal = useModal.getState().openModal
    const CreateCoffeeView = (await import('../Create')).default
    openModal(<CreateCoffeeView clientId={uuid} refetch={mutate} />)
  }

  async function handleOpenBuyCoffee(): Promise<void> {
    if (!uuid) return
    const openModal = useModal.getState().openModal
    const BuyCoffeeView = (await import('../Buy')).default
    openModal(<BuyCoffeeView />)
  }

  return {
    data: data ?? [],
    isLoading,
    total: total ?? 0,
    handleOpenCreateCoffee,
    handleOpenBuyCoffee,
  }
}

type UseCoffeeAccountView = {
  data: CoffeeTransactionModel[]
  isLoading: boolean
  total: number
  handleOpenCreateCoffee: () => Promise<void>
  handleOpenBuyCoffee: () => Promise<void>
}
