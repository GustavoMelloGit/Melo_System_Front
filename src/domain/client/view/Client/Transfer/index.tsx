import { Box } from '@chakra-ui/react'
import { toast } from 'react-hot-toast'
import { formatBagsIntoWeight } from '../../../../../lib/utils/formatters'
import HeaderBreadcrumbs from '../../../../../shared/components/layout/Header/HeaderBreadcrumbs'
import Page from '../../../../../shared/components/Page'
import ClientTransferForm from '../../../components/Client/Transfer/Form'
import { type ClientTransferFormValues } from '../../../components/Client/Transfer/Form/types'
import { transferBetweenClientsService } from '../../../service'

export default function ClientTransferView(): JSX.Element {
  async function handleSubmitTransfer(values: ClientTransferFormValues): Promise<void> {
    const fromItemType = 'bebida' in values.from ? values.from.bebida : 'currency'
    const fromValue: number =
      'bebida' in values.from
        ? formatBagsIntoWeight(values.from.bags, values.from.weight)
        : values.from.value

    const toItemType = 'bebida' in values.to ? values.to.bebida : 'currency'
    const toValue: number =
      'bebida' in values.to
        ? formatBagsIntoWeight(values.to.bags, values.to.weight)
        : values.to.value * 100

    const { error } = await transferBetweenClientsService({
      from: {
        clientId: values.from.clientId,
        item: {
          type: fromItemType,
          value: fromValue,
          ...(values.from.transferType === 'coffee' && {
            details: {
              coffeeType: values.from.coffeeType,
            },
          }),
        },
      },
      to: {
        clientId: values.to.clientId,
        item: {
          type: toItemType,
          value: toValue,
          ...(values.to.transferType === 'coffee' && {
            details: {
              coffeeType: values.to.coffeeType,
            },
          }),
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
