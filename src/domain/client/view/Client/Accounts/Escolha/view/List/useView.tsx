import { useParams } from 'react-router-dom'
import useServiceParams from '../../../../../../../../shared/hooks/useServiceParams'
import { type EscolhaTransactionModel } from '../../../../../../types/model/Transaction'
import { getEscolhaAccountService } from '../../service/get'

export default function useEscolhaAccountView(): UseEscolhaAccountView {
  const { uuid } = useParams()
  const params = useServiceParams()
  const { data, isLoading, total } = getEscolhaAccountService(uuid, params)

  return {
    data: data ?? [],
    isLoading,
    total: total ?? 0,
  }
}

type UseEscolhaAccountView = {
  data: EscolhaTransactionModel[]
  isLoading: boolean
  total: number
}
