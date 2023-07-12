import { VStack } from '@chakra-ui/react'
import { formatCurrency } from '../../../../lib/utils/formatters'
import HeaderBreadcrumbs from '../../../../shared/components/layout/Header/HeaderBreadcrumbs'
import Page from '../../../../shared/components/Page'
import { getTransactionMetrics } from '../../services/get'

export default function TransactionMetricsView(): JSX.Element {
  const { data } = getTransactionMetrics({
    type: 'currency',
  })
  console.log(data)
  return (
    <Page title='Relatórios'>
      <HeaderBreadcrumbs
        heading='Relatórios'
        links={[
          {
            label: 'Relatórios do sistema',
          },
        ]}
      />
      <VStack as='ul'>
        {data?.data.map((transaction) => (
          <li key={transaction.id}>
            {transaction.props.type.name}
            {' = '}
            {transaction.props.type.name === 'currency'
              ? formatCurrency(transaction.props.type.value)
              : transaction.props.type.value}
          </li>
        ))}
      </VStack>
    </Page>
  )
}
