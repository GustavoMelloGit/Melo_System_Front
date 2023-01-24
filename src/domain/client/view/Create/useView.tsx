import { ClientFormValues } from '../../types/components/ClientsForm'
import { UseCreateClientView } from '../../types/view/Create'

export default function useCreateClientView(): UseCreateClientView {
  async function handleCreateClient(values: ClientFormValues): Promise<void> {
    console.log(values)
  }

  return {
    handleCreateClient,
  }
}
