import { Heading } from '@chakra-ui/react'
import { toast } from 'react-hot-toast'
import { dateInputToApiDate } from '../../../../../../../../lib/utils/date'
import Modal from '../../../../../../../../shared/components/Modal'
import { useModal } from '../../../../../../../../shared/hooks/useModal'
import SacariaFormView from '../../components/Form'
import { SacariaAccountEmitter } from '../../events/SacariaAccountEmitter'
import { createSacariaService } from '../../service/post'
import { type SacariaFormValues } from '../../types/sacaria'

type Props = {
  clientUuid: string
}
const CreateSacariaView = ({ clientUuid }: Props): JSX.Element => {
  const closeModal = useModal((state) => state.closeModal)
  async function handleCreateSacaria(formValues: SacariaFormValues): Promise<void> {
    const { date, ...values } = formValues
    const { error } = await createSacariaService(
      {
        ...values,
        date: dateInputToApiDate(date),
      },
      clientUuid,
    )
    if (error) {
      toast.error(error)
      return
    }
    toast.success('Sacaria creditada com sucesso!')
    SacariaAccountEmitter.emit('sacariaCreated', formValues)
    closeModal()
  }
  return (
    <Modal isCentered onClose={closeModal} isOpen>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>
          <Heading as='h1' fontSize='3xl'>
            Conta Sacaria
          </Heading>
        </Modal.Header>
        <Modal.Body pb={8}>
          <SacariaFormView
            onSubmit={handleCreateSacaria}
            initialValues={{ date: new Date().toISOString().split('T')[0], value: 0 }}
          />
        </Modal.Body>
      </Modal.Content>
    </Modal>
  )
}
export default CreateSacariaView
