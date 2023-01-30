import { type ClientModel } from '../../model/Client'

export type ClientsListView = {
  data: ClientModel[] | undefined
  error: string | undefined
  isLoading: boolean
  total: number
  handleCreateClient: () => void
  handleUpdateClient: (uuid: string) => void
}
