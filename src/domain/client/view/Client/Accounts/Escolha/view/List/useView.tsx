import { useParams } from 'react-router-dom'
import { getDefaultSortParams } from '../../../../../../../../lib/utils/utils'
import { useModal } from '../../../../../../../../shared/hooks/useModal'
import useServiceParams from '../../../../../../../../shared/hooks/useServiceParams'
import { type EscolhaTransactionModel } from '../../../../../../types/model/Transaction'
import { getEscolhaAccountService } from '../../service/get'

export default function useEscolhaAccountView(): UseEscolhaAccountView {
  const { uuid } = useParams()
  const params = useServiceParams()
  const openModal = useModal((state) => state.openModal)
  const { data, isLoading, total, mutate } = getEscolhaAccountService(
    uuid,
    params || getDefaultSortParams('date'),
  )

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

  return {
    data: data ?? [],
    isLoading,
    total: total ?? 0,
    handleOpenCreateEscolha,
  }
}

type UseEscolhaAccountView = {
  data: EscolhaTransactionModel[]
  isLoading: boolean
  total: number
  handleOpenCreateEscolha: () => Promise<void>
}
