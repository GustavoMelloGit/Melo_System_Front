import { ClientFormValues } from '../../types/components/ClientsForm'
import { UseUpdateClientView } from '../../types/view/Update'

export default function useUpdateClientView(): UseUpdateClientView {
  async function handleUpdateClient(values: ClientFormValues): Promise<void> {
    console.log(values)
  }
  return {
    handleUpdateClient,
  }
}
