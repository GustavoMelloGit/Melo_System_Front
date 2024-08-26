import { Box } from '@chakra-ui/react'
import { toast } from 'react-hot-toast'
import HeaderBreadcrumbs from '../../../../../shared/components/layout/Header/HeaderBreadcrumbs'
import Page from '../../../../../shared/components/Page'
import ClientTransferForm from '../../../components/Client/Transfer/Form'
import { formValuesToServiceValuesAdapter } from '../../../components/Client/Transfer/Form/formValuesToServiceValuesAdapter'
import { type ClientTransferFormValues } from '../../../components/Client/Transfer/Form/types'
import { ClientService } from '../../../service'

export default function ClientTransferView(): JSX.Element {
  async function handleSubmitTransfer(values: ClientTransferFormValues): Promise<void> {
    const serviceData = formValuesToServiceValuesAdapter(values)
    const { error } = await ClientService.transferBetweenClients(serviceData)
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
        <ClientTransferForm onSubmit={handleSubmitTransfer} />
      </Box>
    </Page>
  )
}
