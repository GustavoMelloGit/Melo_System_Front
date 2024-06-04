import useFetch from '../../../../../../../shared/hooks/useFetch'
import { type GetListResponse } from '../../../../../../../shared/types/service/GetListResponse'
import { type SWRServiceResponse } from '../../../../../../../shared/types/service/SWRServiceResponse'
import { type EscolhaTransactionModel } from '../../../../../types/model/Transaction'
import { parseEscolhaTransactionDescription } from '../utils/parsers'

function parseResponse(
  response: GetListResponse<EscolhaTransactionModel[]>,
): GetListResponse<EscolhaTransactionModel[]> {
  return {
    ...response,
    data: response.data.map((transaction) => ({
      ...transaction,
      description: parseEscolhaTransactionDescription(transaction),
    })),
  }
}

export function getEscolhaAccountService(
  clientId: string | undefined,
  params?: string,
): SWRServiceResponse<GetListResponse<EscolhaTransactionModel[]>> {
  const response = useFetch<GetListResponse<EscolhaTransactionModel[]>>(
    clientId ? `/transactions/escolha/${clientId}?${params ?? ''}` : null,
  )

  return {
    ...response,
    data: response.data ? parseResponse(response.data) : response.data,
  }
}
