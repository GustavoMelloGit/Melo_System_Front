import { Select, Td, Tr } from '@chakra-ui/react'
import { getNumberOfBags } from '../../../../../lib/utils/getNumberOfBags'
import objectEntries from '../../../../../lib/utils/objectEntries'
import Table from '../../../../../shared/components/table/Table'
import {
  type SearchForOption,
  type TableHeaderColumns,
} from '../../../../../shared/components/table/types'
import { CoffeeBebidasLabel } from '../../../../coffee/types/model/coffee'
import { type CreditorsAndDebtorsBebidaMetric } from '../../../types/creditorsAndDebtorsBebidaMetrics'
import CredoresDevedoresBebidaMetricsTableViewRow from './Row'

type Props = {
  data: CreditorsAndDebtorsBebidaMetric[]
  isLoading: boolean
}
export default function CredoresDevedoresBebidaMetricsTableView({
  data,
  isLoading,
}: Props): JSX.Element {
  return (
    <Table
      header={{
        columns: headerColumns,
      }}
      rows={{
        isLoading,
        dataLength: data.length ?? 0,
        noDataMessage: 'Nenhum dado encontrado',
      }}
      pagination={{
        totalLength: 0,
        showPagination: false,
      }}
      filter={{
        searchForOptions,
      }}
      footer={
        data.length ? (
          <Tr>
            <Td>TOTAL</Td>
            <Td></Td>
            <Td></Td>
            <Td>{getNumberOfBags(data.reduce((acc, curr) => acc + curr.balance.total, 0))}</Td>
          </Tr>
        ) : null
      }
    >
      {data.map((client) => (
        <CredoresDevedoresBebidaMetricsTableViewRow
          key={`${client.id}-${client.balance.type}-${client.balance.total}`}
          client={client}
        />
      ))}
    </Table>
  )
}

const headerColumns: TableHeaderColumns[] = [
  { id: 'code', label: 'Código', isSortable: true },
  { id: 'name', label: 'Cliente', isSortable: true },
  { id: 'balance.type', label: 'Bebida', isSortable: true },
  { id: 'balance.total', label: 'Saldo', isSortable: true },
]

const searchForOptions: SearchForOption = {
  searchableName: { label: 'Nome' },
  code: { label: 'Código' },
  'balance.type': {
    label: 'Bebida',
    Input: (field) => (
      <Select variant='filled' {...field}>
        {objectEntries(CoffeeBebidasLabel).map(([value, label]) => (
          <option value={value} key={value}>
            {label}
          </option>
        ))}
      </Select>
    ),
  },
}
