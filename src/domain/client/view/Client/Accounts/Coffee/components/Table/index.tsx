import { Select } from '@chakra-ui/react'
import TableAddButton from '../../../../../../../../shared/components/table/buttons/Add'
import Table from '../../../../../../../../shared/components/table/Table'
import {
  type CustomTableComponentProps,
  type SearchForOption,
  type TableHeaderColumns,
} from '../../../../../../../../shared/components/table/types'
import { CoffeeBebidasLabel, CoffeeTypesEnum } from '../../../../../../../coffee/types/model/coffee'
import { type CoffeeTransactionModel } from '../../../../../../types/model/Transaction'
import CoffeeAccountTableRow from './Row'

type Props = CustomTableComponentProps<CoffeeTransactionModel[]> & {
  onClickAdd: () => void
}

export default function CoffeeAccountTable({
  data,
  isLoading,
  totalLength,
  onClickAdd,
}: Props): JSX.Element {
  return (
    <Table
      header={{
        columns: headerColumns,
      }}
      rows={{
        isLoading,
        dataLength: data?.length ?? 0,
        noDataMessage: 'Nenhum registro encontrado',
      }}
      pagination={{
        totalLength,
      }}
      filter={{
        searchForOptions,
        actions: (
          <TableAddButton
            onClick={onClickAdd}
            aria-label='adicionar transação'
            title='Fazer lançamento'
          />
        ),
      }}
    >
      {data?.map((transaction) => (
        <CoffeeAccountTableRow key={transaction.id} transaction={transaction} />
      ))}
    </Table>
  )
}

const searchForOptions: SearchForOption = {
  oneDayInterval: {
    label: 'Data',
    inputProps: {
      type: 'date',
    },
  },
  'type.name': {
    label: 'Bebida',
    Input: (
      <Select variant='filled' roundedLeft={0} flexGrow={1}>
        {Object.entries(CoffeeBebidasLabel).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </Select>
    ),
  },
  'details.coffeeType': {
    label: 'Tipo',
    Input: (
      <Select variant='filled' roundedLeft={0} flexGrow={1}>
        {Object.entries(CoffeeTypesEnum).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </Select>
    ),
  },
}

const headerColumns: TableHeaderColumns[] = [
  {
    id: 'date',
    label: 'Data',
    isSortable: true,
    px: 3,
    w: 120,
  },
  {
    id: 'description',
    label: 'Descrição',
    px: 3,
  },

  {
    id: 'details.coffeeType',
    label: 'Tipo',
    px: 3,
    isSortable: true,
    w: '120px',
  },
  {
    id: 'details.bebida',
    label: 'Bebida',
    isSortable: true,
    px: 3,
    w: '150px',
  },
  {
    id: 'type.value',
    label: 'Pesagem',
    px: 3,
  },
  {
    id: 'clientBalance',
    label: 'Saldo',
    isSortable: true,
    px: 3,
  },
  {
    id: 'actions',
    label: 'Ações',
    textAlign: 'center',
    px: 3,
  },
]
