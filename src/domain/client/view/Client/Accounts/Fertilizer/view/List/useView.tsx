import { useCallback, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import { useModal } from '../../../../../../../../shared/hooks/useModal'
import useServiceParams from '../../../../../../../../shared/hooks/useServiceParams'
import { type GetListResponse } from '../../../../../../../../shared/types/service/GetListResponse'
import { type FertilizerTransactionModel } from '../../../../../../types/model/Transaction'
import { FertilizerAccountEmitter } from '../../events/FertilizerAccountEmitter'
import { getFertilizerTransactionService } from '../../services/get'

export default function useFertilizerAccountView(): UseFertilizerAccountView {
  const { uuid } = useParams()
  const params = useServiceParams()
  const openModal = useModal((state) => state.openModal)

  const { data, isLoading, mutate } = getFertilizerTransactionService(uuid, params)

  async function handleOpenSellModal(): Promise<void> {
    if (!uuid) {
      toast.error('Não foi possível abrir a modal de venda de fertilizante')
      return
    }
    const SellFertilizer = (await import('../../components/Sell')).default
    openModal(<SellFertilizer clientId={uuid} />)
  }

  const refetchData = useCallback(async () => {
    await mutate()
  }, [mutate])

  useEffect(() => {
    FertilizerAccountEmitter.on('fertilizerSold', refetchData)
    return () => {
      FertilizerAccountEmitter.off('fertilizerSold', refetchData)
    }
  }, [refetchData])

  return {
    data,
    isLoading,
    handleOpenSellModal,
  }
}

type UseFertilizerAccountView = {
  data: GetListResponse<FertilizerTransactionModel[]> | undefined
  isLoading: boolean
  handleOpenSellModal: () => Promise<void>
}
