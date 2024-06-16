import { useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useModal } from '../../../../../../../../shared/hooks/useModal'
import useServiceParams from '../../../../../../../../shared/hooks/useServiceParams'
import { useGetTransactionsService } from '../../../../../../service/ClientService.hooks'
import { type CurrencyTransactionModel } from '../../../../../../types/model/Transaction'
import { CheckingAccountEmitter } from '../../events/CheckingAccountEmitter'
import CreateTransactionView from '../Create'

export default function useListTransactionsView(): UseListTransactionsView {
  const openModal = useModal((state) => state.openModal)
  const { uuid } = useParams()
  const params = useServiceParams()
  const { isLoading, mutate, data } = useGetTransactionsService(uuid ?? '', params)

  const refetchData = useCallback(async (): Promise<void> => {
    await mutate()
  }, [mutate])

  function handleAddTransaction(): void {
    openModal(<CreateTransactionView uuid={uuid ?? ''} />)
  }

  const createTransactionHandler = useCallback(async () => {
    await refetchData()
  }, [refetchData])

  useEffect(() => {
    CheckingAccountEmitter.on('transactionCreated', createTransactionHandler)
    return () => {
      CheckingAccountEmitter.off('transactionCreated', createTransactionHandler)
    }
  }, [createTransactionHandler])

  return {
    data: data?.data ?? [],
    isLoading,
    total: data?.total ?? 0,
    handleAddTransaction,
    refetchData,
  }
}

type UseListTransactionsView = {
  data: CurrencyTransactionModel[]
  isLoading: boolean
  total: number
  handleAddTransaction: () => void
  refetchData: () => void
}
