import { useParams } from 'react-router-dom'
import { useModal } from '../../../../../../../../shared/hooks/useModal'
import useServiceParams from '../../../../../../../../shared/hooks/useServiceParams'
import { type EscolhaTransactionModel } from '../../../../../../types/model/Transaction'
import { getEscolhaAccountService } from '../../service/get'

export default function useEscolhaAccountView(): UseEscolhaAccountView {
  const { uuid } = useParams()
  const params = useServiceParams()
  const openModal = useModal((state) => state.openModal)
  const { data, isLoading, mutate } = getEscolhaAccountService(uuid, params)

  async function handleOpenCreateEscolha(): Promise<void> {
    if (!uuid) return
    const CreateEscolhaView = (await import('../../view/Create')).default
    openModal(
      <CreateEscolhaView
        clientId={uuid}
        onSuccess={() => {
          void mutate()
        }}
      />,
    )
  }

  async function handleOpenBuyEscolha(): Promise<void> {
    if (!uuid) return
    const BuyEscolhaView = (await import('../../view/Buy')).default
    openModal(<BuyEscolhaView clientId={uuid} refetch={mutate} />)
  }

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
