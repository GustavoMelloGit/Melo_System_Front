import { Select } from '@chakra-ui/react'
import Table from '../../../../../../../../shared/components/table/Table'
import {
  type CustomTableComponentProps,
  type SearchForOption,
  type TableHeaderColumns,
} from '../../../../../../../../shared/components/table/types'
import { CoffeeDetailsTypesEnum } from '../../../../../../../coffee/types/model/coffee'
import { type CoffeeTransactionModel } from '../../../../../../types/model/Transaction'
import CoffeeAccountTableRow from './Row'

type Props = CustomTableComponentProps<CoffeeTransactionModel[]>

export default function CoffeeAccountTable({ data, isLoading, totalLength }: Props): JSX.Element {
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
        dataLength: data?.length ?? 0,
        totalLength,
      }}
      filter={{
        searchForOptions,
      }}
    >
      {data?.map((transaction) => (
        <CoffeeAccountTableRow key={transaction.id} transaction={transaction} />
      ))}
    </Table>
  )
}

const searchForOptions: SearchForOption = {
  date: {
    label: 'Data',
    inputProps: {
      type: 'date',
    },
  },
  'details.type': {
    label: 'Tipo',
    Input: (
      <Select variant='filled' roundedLeft={0} flexGrow={1}>
        {Object.entries(CoffeeDetailsTypesEnum).map(([value, label]) => (
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
    id: 'bags',
    label: 'Sacos',
    px: 3,
  },
  {
    id: 'details.type',
    label: 'Bebida',
    isSortable: true,
    px: 3,
  },
  {
    id: 'description',
    label: 'Descrição',
    px: 3,
  },
  {
    id: 'createdAt',
    label: 'Data',
    isSortable: true,
    defaultSort: 'desc',
    px: 3,
  },
  {
    id: 'actions',
    label: 'Ações',
    textAlign: 'center',
    px: 3,
  },
]
