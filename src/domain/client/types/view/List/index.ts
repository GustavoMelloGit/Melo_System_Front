import { type ClientModel } from '../../model/Client'

export type ClientsListView = {
  data: ClientModel[] | undefined
  error: Error | undefined
  isLoading: boolean
  handleCreateClient: () => void
  handleUpdateClient: (uuid: string) => void
}
