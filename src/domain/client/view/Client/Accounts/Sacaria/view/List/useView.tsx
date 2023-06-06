import { useParams } from 'react-router-dom'
import { useModal } from '../../../../../../../../shared/hooks/useModal'
import useServiceParams from '../../../../../../../../shared/hooks/useServiceParams'
import { type SacariaTransactionModel } from '../../../../../../types/model/Transaction'
import { getSacariaAccountService } from '../../service/get'

export default function useSacariaAccountView(): UseSacariaAccountView {
  const { uuid } = useParams()
  const openModal = useModal((state) => state.openModal)
  const params = useServiceParams()
  const { data, isLoading, mutate } = getSacariaAccountService(uuid, params)

  async function handleOpenCreate(): Promise<void> {
    if (!uuid) return
    const CreateSacariaView = (await import('../../view/Create')).default
    openModal(<CreateSacariaView clientUuid={uuid} refetch={mutate} />)
  }

  return {
    data: data?.data ?? [],
    isLoading,
    total: data?.total ?? 0,
    handleCreate: handleOpenCreate,
  }
}

type UseSacariaAccountView = {
  data: SacariaTransactionModel[]
  isLoading: boolean
  total: number
  handleCreate: () => void
}
