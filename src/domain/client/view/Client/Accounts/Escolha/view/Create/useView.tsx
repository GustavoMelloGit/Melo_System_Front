import { toast } from 'react-hot-toast'
import { dateInputToApiDate } from '../../../../../../../../lib/utils/date'
import { formatBagsIntoWeight } from '../../../../../../../../lib/utils/formatters'
import { useModal } from '../../../../../../../../shared/hooks/useModal'
import { EscolhaAccountEmitter } from '../../events/EscolhaAccountEmitter'
import { createEscolhaService } from '../../service/post'
import { type EscolhaFormValues } from '../../types/esolha'

type Props = {
  clientId: string
}
export default function useCreateEscolhaView({ clientId }: Props): UseCreateEscolhaView {
  const closeModal = useModal((state) => state.closeModal)

  async function handleCreateEscolha({
    bags,
    weight,
    date,
    ...values
  }: EscolhaFormValues): Promise<void> {
    const { error, data } = await createEscolhaService({
      clientId,
      date: dateInputToApiDate(date),
      details: values.details,
      value: formatBagsIntoWeight(bags, weight),
      description: values.description,
    })
    if (error) {
      toast.error(error)
    } else if (data) {
      toast.success('Escolha creditada com sucesso!')
      EscolhaAccountEmitter.emit('escolhaCreated', data)
      closeModal()
    }
  }

  return {
    handleCreateEscolha,
    closeModal,
  }
}

type UseCreateEscolhaView = {
  handleCreateEscolha: (values: EscolhaFormValues) => Promise<void>
  closeModal: () => void
}
