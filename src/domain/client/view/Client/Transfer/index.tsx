import { Flex } from '@chakra-ui/react'
import HeaderBreadcrumbs from '../../../../../shared/components/layout/Header/HeaderBreadcrumbs'
import Page from '../../../../../shared/components/Page'
import { CoffeeBebidasLabel } from '../../../../coffee/types/model/coffee'
import TransferOptionBox from '../../../components/Client/Transfer/TransferOptionBox'

export default function TransferCurrencyView(): JSX.Element {
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
      <Flex justify='space-between'>
        <TransferOptionBox options={CoffeeBebidasLabel} />
        <TransferOptionBox options={CoffeeBebidasLabel} />
      </Flex>
    </Page>
  )
}
