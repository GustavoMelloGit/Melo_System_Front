import { useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useModal } from '../../../../../../../../shared/hooks/useModal'
import useServiceParams from '../../../../../../../../shared/hooks/useServiceParams'
import { type EscolhaTransactionModel } from '../../../../../../types/model/Transaction'
import { EscolhaAccountEmitter } from '../../events/EscolhaAccountEmitter'
import { useGetEscolhaAccountService } from '../../service/get'

export default function useEscolhaAccountView(): UseEscolhaAccountView {
  const { uuid } = useParams()
  const params = useServiceParams()
  const openModal = useModal((state) => state.openModal)
  const { data, isLoading, mutate } = useGetEscolhaAccountService(uuid, params)

  const refetchData = useCallback(async () => {
    await mutate()
  }, [mutate])

  async function handleOpenCreateEscolha(): Promise<void> {
    if (!uuid) return
    const CreateEscolhaView = (await import('../../view/Create')).default
    openModal(<CreateEscolhaView clientId={uuid} />)
  }

  async function handleOpenBuyEscolha(): Promise<void> {
    if (!uuid) return
    const BuyEscolhaView = (await import('../../view/Buy')).default
    openModal(<BuyEscolhaView clientId={uuid} />)
  }

  useEffect(() => {
    EscolhaAccountEmitter.on('escolhaBought', refetchData)
    EscolhaAccountEmitter.on('escolhaCreated', refetchData)
    return () => {
      EscolhaAccountEmitter.off('escolhaBought', refetchData)
      EscolhaAccountEmitter.off('escolhaCreated', refetchData)
    }
  }, [refetchData])

  return {
    data: data?.data ?? [],
    isLoading,
    total: data?.total ?? 0,
    handleOpenCreateEscolha,
    handleOpenBuyEscolha,
  }
}

type UseEscolhaAccountView = {
  data: EscolhaTransactionModel[]
  isLoading: boolean
  total: number
  handleOpenCreateEscolha: () => Promise<void>
  handleOpenBuyEscolha: () => Promise<void>
}
