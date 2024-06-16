import { useParams } from 'react-router-dom'
import { type GetListResponse } from '../../../../../shared/types/service/GetListResponse'
import { useGetSheetsService } from '../../../../coffee/services/Sheets'
import { type SheetModel } from '../../../../coffee/types/model/sheet'
import { useGetClientService } from '../../../service/ClientService.hooks'
import { type ClientModel } from '../../../types/model/Client'

export default function useClientSheetsPage(): UseClientSheetsPage {
  const { uuid } = useParams()
  const { data: sheets, isLoading: sheetsLoading } = useGetSheetsService({
    params: `clientId=${uuid ?? ''}`,
  })
  const { data: client } = useGetClientService(uuid ?? '')

  return {
    sheets,
    isLoading: sheetsLoading,
    client,
    clientId: uuid ?? '',
  }
}

type UseClientSheetsPage = {
  sheets: GetListResponse<SheetModel[]> | undefined
  isLoading: boolean
  client: ClientModel | undefined
  clientId: string
}
