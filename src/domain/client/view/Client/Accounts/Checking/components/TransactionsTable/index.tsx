import { HStack } from '@chakra-ui/react'
import TableAddButton from '../../../../../../../../shared/components/table/buttons/Add'
import TableFeeButton from '../../../../../../../../shared/components/table/buttons/Fee'
import Table from '../../../../../../../../shared/components/table/Table'
import {
  type SearchForOption,
  type TableHeaderColumns,
} from '../../../../../../../../shared/components/table/types'
import { type CurrencyTransactionModel } from '../../../../../../types/model/Transaction'
import TransactionsListRow from './Row'
import useTransactionTable from './useView'

type TransactionsTableProps = {
  data: CurrencyTransactionModel[]
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
  const { selectionMode, onSelectFee, handleClickFee } = useTransactionTable()
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
          <HStack spacing={0.5}>
            <TableAddButton
              onClick={onClickAdd}
              aria-label='adicionar transação'
              title='Fazer lançamento'
            />

            <TableFeeButton
              onClick={handleClickFee}
              aria-label='calcular juros'
              title='Calcular juros'
              colorScheme={selectionMode ? 'blue' : undefined}
            />
          </HStack>
        ),
      }}
    >
      {data?.map((transaction, index) => (
        <TransactionsListRow onSelectFee={onSelectFee} key={index} transaction={transaction} />
      ))}
    </Table>
  )
}

const headerColumns: TableHeaderColumns[] = [
  { id: 'date', label: 'Data', isSortable: true, defaultSort: 'desc' },
  { id: 'description', label: 'Descrição' },
  { id: 'type.value', label: 'Valor', isSortable: true },
  { id: 'clientBalance', label: 'Saldo', isSortable: true },
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
