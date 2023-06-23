import { toast } from 'react-hot-toast'
import { formatInputDateString } from '../../../../../../../../lib/utils/date'
import { formatBagsIntoWeight } from '../../../../../../../../lib/utils/formatters'
import { useModal } from '../../../../../../../../shared/hooks/useModal'
import { type EscolhaTransactionModel } from '../../../../../../types/model/Transaction'
import { createEscolhaService } from '../../service/post'
import { type EscolhaFormValues } from '../../types/esolha'

type Props = {
  clientId: string
  onSuccess?: (data: EscolhaTransactionModel) => void
}
export default function useCreateEscolhaView({ clientId, onSuccess }: Props): UseCreateEscolhaView {
  const closeModal = useModal((state) => state.closeModal)

  async function handleCreateEscolha({
    bags,
    weight,
    date,
    ...values
  }: EscolhaFormValues): Promise<void> {
    const { error, data } = await createEscolhaService({
      clientId,
      date: formatInputDateString(date),
      details: values.details,
      value: formatBagsIntoWeight(bags, weight),
      description: values.description,
    })
    if (error) {
      toast.error(error)
    } else if (data) {
      toast.success('Escolha creditada com sucesso!')
      onSuccess?.(data)
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
