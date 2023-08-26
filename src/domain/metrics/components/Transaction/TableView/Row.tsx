import { Td, Tr } from '@chakra-ui/react'
import { format } from 'date-fns'
import { Routes } from '../../../../../lib/routes'
import { formatCurrency } from '../../../../../lib/utils/formatters'
import { getNumberOfBags } from '../../../../../lib/utils/getNumberOfBags'
import { getColorByValue } from '../../../../../lib/utils/styles'
import Link from '../../../../../shared/components/Link'
import { type TransactionTypeName } from '../../../../client/types/model/Transaction'
import { type TransactionMetrics } from '../../../types/transactionMetrics'

const labelByType: Record<TransactionTypeName, string> = {
  bags: 'Sacaria',
  currency: 'Corrente',
  escolha: 'Escolha',
  fertilizer: 'Adubo',
  duro: 'Café duro',
  duro_riado: 'Café duro riado',
  rio: 'Café rio',
  rio_velho: 'Café rio velho',
  rio_zona: 'Café rio zona',
  riado: 'Café riado',
  riado_rio: 'Café riado rio',
  duro_riado_rio: 'Café duro riado rio',
}

const formatterByType: Record<TransactionTypeName, (value: number) => string | number> = {
  bags: (value) => `${value} Sacas`,
  currency: formatCurrency,
  escolha: getNumberOfBags,
  fertilizer: (value) => `${value} Sacos`,
  duro: getNumberOfBags,
  duro_riado: getNumberOfBags,
  rio: getNumberOfBags,
  rio_velho: getNumberOfBags,
  rio_zona: getNumberOfBags,
  riado: getNumberOfBags,
  riado_rio: getNumberOfBags,
  duro_riado_rio: getNumberOfBags,
}

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
      <Td>{labelByType[type.name]}</Td>
      <Td color={getColorByValue(type.value)}>{formatterByType[type.name]?.(type.value)}</Td>
    </Tr>
  )
}
