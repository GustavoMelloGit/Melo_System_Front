import { useCallback, useEffect } from 'react'
import { useModal } from '../../../../../shared/hooks/useModal'
import useServiceParams from '../../../../../shared/hooks/useServiceParams'
import { getFertilizersService } from '../../../../fertilizer/services/get'
import { ProductEmitter } from '../../../events/ProductEmitter'

export default function useStockListView(): UseStockListView {
  const params = useServiceParams()
  const response = getFertilizersService(params)
  const openModal = useModal((state) => state.openModal)

  async function createProductHandler(): Promise<void> {
    const CreateFertilizerView = (await import('../Create')).default
    openModal(<CreateFertilizerView refetch={response.mutate} />)
  }

  const refetchData = useCallback(async () => {
    await response.mutate()
  }, [])

  useEffect(() => {
    ProductEmitter.on('productCreated', refetchData)
    ProductEmitter.on('productUpdated', refetchData)
    ProductEmitter.on('productDeleted', refetchData)
    ProductEmitter.on('productCredited', refetchData)

    return () => {
      ProductEmitter.off('productCreated', refetchData)
      ProductEmitter.off('productUpdated', refetchData)
      ProductEmitter.off('productDeleted', refetchData)
      ProductEmitter.off('productCredited', refetchData)
    }
  }, [])

  return {
    response,
    createProductHandler,
  }
}

type UseStockListView = {
  response: ReturnType<typeof getFertilizersService>
  createProductHandler: () => Promise<void>
}
