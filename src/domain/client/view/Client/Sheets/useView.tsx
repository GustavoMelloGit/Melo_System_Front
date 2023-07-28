import { useParams } from 'react-router-dom'
import { type GetListResponse } from '../../../../../shared/types/utils/service'
import { getSheetsService } from '../../../../coffee/services/Sheets'
import { type SheetModel } from '../../../../coffee/types/model/sheet'
import { getClientService } from '../../../service'
import { type ClientModel } from '../../../types/model/Client'

export default function useClientSheetsPage(): UseClientSheetsPage {
  const { uuid } = useParams()
  const { data: sheets, isLoading: sheetsLoading } = getSheetsService({
    params: `clientId=${uuid as string}`,
  })
  const { data: client } = getClientService(uuid ?? '')

  return {
    sheets,
    isLoading: sheetsLoading,
    client,
    clientId: uuid as string,
  }
}

type UseClientSheetsPage = {
  sheets: GetListResponse<SheetModel[]> | undefined
  isLoading: boolean
  client: ClientModel | undefined
  clientId: string
}
