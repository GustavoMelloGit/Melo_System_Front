import { useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { PaginationParams } from '../../../../../../../../lib/constants/pagination'
import { useModal } from '../../../../../../../../shared/hooks/useModal'
import useServiceParams from '../../../../../../../../shared/hooks/useServiceParams'
import useURLSearchParams from '../../../../../../../../shared/hooks/useURLSearchParams'
import { type CoffeeTransactionModel } from '../../../../../../types/model/Transaction'
import { CoffeeAccountEmitter } from '../../events/CoffeeAccountEmitter'
import { getCoffeeAccountService } from '../../service/get'

export default function useCoffeeAccountView(): UseCoffeeAccountView {
  const { uuid } = useParams()
  const params = useServiceParams()
  const { allSearchParams } = useURLSearchParams()
  let accountType = 'coffee'
  if (
    allSearchParams[PaginationParams.searchFor] &&
    allSearchParams[PaginationParams.searchBy] &&
    allSearchParams[PaginationParams.searchFor] === 'type.name'
  ) {
    accountType = allSearchParams[PaginationParams.searchBy]
  }
  const { data, isLoading, mutate } = getCoffeeAccountService(uuid, accountType, params)

  async function handleOpenCreateCoffee(): Promise<void> {
    if (!uuid) return
    const openModal = useModal.getState().openModal
    const CreateCoffeeView = (await import('../Create')).default
    openModal(<CreateCoffeeView clientId={uuid} />)
  }

  async function handleOpenBuyCoffee(): Promise<void> {
    if (!uuid) return
    const openModal = useModal.getState().openModal
    const BuyCoffeeView = (await import('../Buy')).default
    openModal(<BuyCoffeeView clientId={uuid} />)
  }

  const refetchData = useCallback(async () => {
    await mutate()
  }, [mutate])

  useEffect(() => {
    CoffeeAccountEmitter.on('coffeeBought', refetchData)
    CoffeeAccountEmitter.on('coffeeCreated', refetchData)
    return () => {
      CoffeeAccountEmitter.off('coffeeBought', refetchData)
      CoffeeAccountEmitter.off('coffeeCreated', refetchData)
    }
  }, [refetchData])

  return {
    data: data?.data ?? [],
    isLoading,
    total: data?.total ?? 0,
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
