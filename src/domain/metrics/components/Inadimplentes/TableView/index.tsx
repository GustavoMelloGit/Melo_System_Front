import { Td, Tr } from '@chakra-ui/react'
import { useMemo } from 'react'
import { deepClone } from '../../../../../lib/utils/deepClone'
import { formatCurrency } from '../../../../../lib/utils/formatters'
import Table from '../../../../../shared/components/table/Table'
import { type TableHeaderColumns } from '../../../../../shared/components/table/types'
import { type ClientModel } from '../../../../client/types/model/Client'
import InadimplentesMetricsTableViewRow from './Row'

type Props = {
  data: ClientModel[]
  isLoading: boolean
}
export default function InadimplentesMetricsTableView({ data, isLoading }: Props): JSX.Element {
  const sortedData = useMemo(() => {
    const clonedData = deepClone(data)
    const sortedData = clonedData.sort((a, b) => a.balance - b.balance)
    return sortedData
  }, [data])
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
      {sortedData.map((client) => (
        <InadimplentesMetricsTableViewRow key={client.name} client={client} />
      ))}
    </Table>
  )
}

const headerColumns: TableHeaderColumns[] = [
  { id: 'code', label: 'Código', isSortable: false },
  { id: 'name', label: 'Cliente', isSortable: false },
  { id: 'address.brook', label: 'Córrego', isSortable: false },
  { id: 'balance', label: 'Saldo', isSortable: false },
]
