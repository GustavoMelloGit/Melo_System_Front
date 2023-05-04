import { toast } from 'react-hot-toast'
import { formatInputDateToApiDate } from '../../../../../../../../lib/utils/date'
import { useModal } from '../../../../../../../../shared/hooks/useModal'
import SacariaFormView from '../../components/Form'
import { createSacariaService } from '../../service/post'
import { type SacariaFormValues } from '../../types/sacaria'

type Props = {
  clientUuid: string
  refetch: () => void
}
const CreateSacariaView = ({ clientUuid, refetch }: Props): JSX.Element => {
  const closeModal = useModal((state) => state.closeModal)
  async function handleCreateSacaria({ date, ...values }: SacariaFormValues): Promise<void> {
    const { error } = await createSacariaService(
      {
        ...values,
        date: formatInputDateToApiDate(date),
      },
      clientUuid,
    )
    if (error) {
      toast.error(error)
      return
    }
    toast.success('Sacaria creditada com sucesso!')
    refetch()
    closeModal()
  }
  return (
    <SacariaFormView
      onSubmit={handleCreateSacaria}
      initialValues={{ date: new Date().toISOString().split('T')[0], value: 0 }}
    />
  )
}
export default CreateSacariaView
