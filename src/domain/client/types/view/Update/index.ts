import { type ClientFormValues } from '../../components/ClientsForm'

export type UseUpdateClientView = {
  handleUpdateClient: (client: ClientFormValues) => Promise<void>
}
