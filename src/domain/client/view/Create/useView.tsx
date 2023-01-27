import { type ClientFormValues } from '../../types/components/ClientsForm'
import { type UseCreateClientView } from '../../types/view/Create'

export default function useCreateClientView(): UseCreateClientView {
  async function handleCreateClient(values: ClientFormValues): Promise<void> {
    console.log(values)
  }

  return {
    handleCreateClient,
  }
}
