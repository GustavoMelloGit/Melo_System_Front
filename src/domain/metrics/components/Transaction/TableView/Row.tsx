import { Td, Tr } from '@chakra-ui/react'
import { format } from 'date-fns'
import { Routes } from '../../../../../lib/routes'
import { getColorByValue } from '../../../../../lib/utils/getColorByValue'
import Link from '../../../../../shared/components/Link'
import { formatterByTransactionTypeName } from '../../../constants/formatterByTransactionTypeName'
import { labelByTransactionTypeName } from '../../../constants/labelByTransactionTypeName'
import { type TransactionMetrics } from '../../../types/transactionMetrics'

type Props = {
  metric: TransactionMetrics
}
export default function TransactionMetricsTableViewRow({ metric }: Props): JSX.Element {
  const { client, date, type } = metric.props
  return (
    <Tr>
      <Td>{format(date, 'dd/MM/yyyy')}</Td>
      <Td>
        <Link to={Routes.clientPage(client.id)}>
          {client.code} - {client.name}
        </Link>
      </Td>
      <Td>{labelByTransactionTypeName[type.name]}</Td>
      <Td color={getColorByValue(type.value)}>
        {formatterByTransactionTypeName[type.name]?.(type.value)}
      </Td>
    </Tr>
  )
}
