import { Td, Tr } from '@chakra-ui/react'
import { formatCurrency } from '../../../../../lib/utils/formatters'
import Table from '../../../../../shared/components/table/Table'
import { type TableHeaderColumns } from '../../../../../shared/components/table/types'
import { type ClientModel } from '../../../../client/types/model/Client'
import CredoresDevedoresMetricsTableViewRow from './Row'

type Props = {
  data: ClientModel[]
  isLoading: boolean
}
export default function CredoresDevedoresMetricsTableView({ data, isLoading }: Props): JSX.Element {
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
      footer={
        data.length ? (
          <Tr>
            <Td>TOTAL</Td>
            <Td></Td>
            <Td></Td>
            <Td>{formatCurrency(data.reduce((acc, curr) => acc + curr.balance, 0))}</Td>
          </Tr>
        ) : null
      }
    >
      {data.map((client) => (
        <CredoresDevedoresMetricsTableViewRow key={client.name} client={client} />
      ))}
    </Table>
  )
}

const headerColumns: TableHeaderColumns[] = [
  { id: 'code', label: 'Código', isSortable: true },
  { id: 'name', label: 'Cliente', isSortable: true },
  { id: 'address.brook', label: 'Córrego', isSortable: true },
  { id: 'balance', label: 'Saldo', isSortable: true },
]
