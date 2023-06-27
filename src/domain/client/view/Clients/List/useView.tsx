import { toast } from 'react-hot-toast'
import useServiceParams from '../../../../../shared/hooks/useServiceParams'
import { getClientsService } from '../../../service'
import { deleteClientService } from '../../../service/delete'
import { type ClientModel } from '../../../types/model/Client'

export default function useClientsListView(): ClientsListView {
  const params = useServiceParams()
  const { data, error, isLoading, mutate } = getClientsService(params)

  async function handleRemoveClient(id: string): Promise<void> {
    const { error } = await deleteClientService(id)
    if (error) {
      toast.error('Erro ao remover cliente')
      return
    }
    toast.success('Cliente removido com sucesso')
    await mutate()
  }

  return {
    data: data?.data,
    error,
    isLoading,
    total: data?.total ?? 0,
    handleRemoveClient,
  }
}

export type ClientsListView = {
  data: ClientModel[] | undefined
  error: string | undefined
  isLoading: boolean
  total: number
  handleRemoveClient: (id: string) => Promise<void>
}
