import { ClientFormValues } from '../../components/ClientsForm'

export type UseCreateClientView = {
  handleCreateClient: (values: ClientFormValues) => Promise<void>
}
