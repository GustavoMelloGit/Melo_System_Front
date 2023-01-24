import { ClientModel } from '../../model/Client'

export type ClientsListView = {
  data: ClientModel[] | undefined
  error: Error | undefined
  isLoading: boolean
  fetchNextPage: () => Promise<void>
  fetchPreviousPage: () => Promise<void>
  changeRowsPerPage: (rowsPerPage: number) => Promise<void>
  handleCreateClient: () => void
  handleUpdateClient: (uuid: string) => void
}
