import { type EscolhaFormValues } from '../../types/esolha'

export default function useCreateEscolhaView(): UseCreateEscolhaView {
  async function handleCreateEscolha(values: EscolhaFormValues): Promise<void> {
    console.log(values)
  }

  return {
    handleCreateEscolha,
  }
}

type UseCreateEscolhaView = {
  handleCreateEscolha: (values: EscolhaFormValues) => Promise<void>
}
