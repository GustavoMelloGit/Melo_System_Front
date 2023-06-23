import { Box } from '@chakra-ui/react'
import { toast } from 'react-hot-toast'
import HeaderBreadcrumbs from '../../../../../shared/components/layout/Header/HeaderBreadcrumbs'
import Page from '../../../../../shared/components/Page'
import ClientTransferForm from '../../../components/Client/Transfer/Form'
import { type ClientTransferFormValues } from '../../../components/Client/Transfer/Form/types'
import { transferBetweenClientsService } from '../../../service'

export default function ClientTransferView(): JSX.Element {
  async function handleSubmitTransfer(values: ClientTransferFormValues): Promise<void> {
    const { error } = await transferBetweenClientsService({
      from: {
        clientId: values.from.clientId,
        item: {
          type: 'bebida' in values.from ? values.from.bebida : 'currency',
          value: values.from.value,
        },
      },
      to: {
        clientId: values.to.clientId,
        item: {
          type: 'bebida' in values.to ? values.to.bebida : 'currency',
          value: values.to.value,
        },
      },
    })
    if (error) {
      toast.error(error)
      return
    }
    toast.success('Transferência realizada com sucesso!')
  }

  return (
    <Page title='Transferência entre contas' data-cy='client-transfer-page'>
      <HeaderBreadcrumbs
        heading='Transferências'
        links={[
          {
            label: 'Transferência entre contas',
          },
        ]}
      />
      <Box>
        <ClientTransferForm
          onSubmit={handleSubmitTransfer}
          initialValues={{
            from: {
              clientId: '',
              value: 0,
              transferType: 'currency',
            },
            to: {
              clientId: '',
              value: 0,
              transferType: 'currency',
            },
          }}
        />
      </Box>
    </Page>
  )
}
