import { HStack } from '@chakra-ui/react'
import TableAddButton from '../../../../../../../../shared/components/table/Buttons/Add'
import Table from '../../../../../../../../shared/components/table/Table'
import {
  type SearchForOption,
  type TableHeaderColumns,
} from '../../../../../../../../shared/components/table/types'
import { type TransactionModel } from '../../../../../../types/model/Transaction'
import TransactionsListRow from './Row'

type TransactionsTableProps = {
  data: TransactionModel[]
  total: number
  isLoading: boolean
  onClickAdd: () => void
}
export default function TransactionsTable({
  data,
  isLoading,
  total,
  onClickAdd,
}: TransactionsTableProps): JSX.Element {
  return (
    <Table
      header={{
        columns: headerColumns,
      }}
      rows={{
        isLoading,
        dataLength: data?.length ?? 0,
        noDataMessage: 'Nenhuma transação encontrada',
      }}
      pagination={{
        dataLength: data?.length ?? 0,
        totalLength: total,
      }}
      filter={{
        searchForOptions,
        actions: (
          <HStack>
            <TableAddButton onClick={onClickAdd} aria-label='adicionar transação' />
          </HStack>
        ),
      }}
    >
      {data?.map((transaction, index) => (
        <TransactionsListRow key={index} transaction={transaction} />
      ))}
    </Table>
  )
}

const headerColumns: TableHeaderColumns[] = [
  { id: 'date', label: 'Data', isSortable: true },
  { id: 'description', label: 'Descrição' },
  { id: 'value', label: 'Valor', isSortable: true },
  { id: 'actions', label: 'Ações', align: 'center' },
]
const searchForOptions: SearchForOption = {
  description: { label: 'Descrição' },
  date: {
    label: 'Data',
    inputProps: {
      type: 'date',
    },
  },
}
