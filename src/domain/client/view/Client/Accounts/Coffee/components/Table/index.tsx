import { Select } from '@chakra-ui/react'
import IconButton from '../../../../../../../../shared/components/IconButton'
import Table from '../../../../../../../../shared/components/table/Table'
import {
  type CustomTableComponentProps,
  type SearchForOption,
  type TableHeaderColumns,
} from '../../../../../../../../shared/components/table/types'
import {
  CoffeeBebidasLabel,
  CoffeeTypesLabel,
} from '../../../../../../../coffee/types/model/coffee'
import DownloadAccountButton from '../../../../../../components/Client/DownloadAccountButton'
import { type CoffeeTransactionModel } from '../../../../../../types/model/Transaction'
import DownloadCoffeeAccountTemplate from '../Template/Template'
import CoffeeAccountTableRow from './Row'

type Props = CustomTableComponentProps<CoffeeTransactionModel[]> & {
  onClickAdd: () => Promise<void>
  onClickBuy: () => Promise<void>
}

export default function CoffeeAccountTable({
  data,
  isLoading,
  totalLength,
  onClickAdd,
  onClickBuy,
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
          <>
            <DownloadAccountButton
              account='coffee'
              template={(data) => {
                return <DownloadCoffeeAccountTemplate data={data} />
              }}
            />
            <IconButton
              icon='shopCart'
              onClick={onClickBuy}
              aria-label='Comprar café'
              title='Comprar café'
            />
            <IconButton
              icon='add'
              onClick={onClickAdd}
              aria-label='adicionar transação'
              title='Fazer lançamento'
            />
          </>
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
  'type.name': {
    label: 'Bebida',
    Input: (field) => (
      <Select variant='filled' roundedLeft={0} flexGrow={1} {...field}>
        {Object.entries(CoffeeBebidasLabel).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </Select>
    ),
  },
  oneDayInterval: {
    label: 'Data',
    inputProps: {
      type: 'date',
    },
  },
  'details.coffeeType': {
    label: 'Tipo',
    Input: (field) => (
      <Select variant='filled' roundedLeft={0} flexGrow={1} {...field}>
        {Object.entries(CoffeeTypesLabel).map(([value, label]) => (
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
  },
  {
    id: 'details.coffeeType',
    label: 'Tipo',
    isSortable: true,
  },
  {
    id: 'details.bebida',
    label: 'Bebida',
    isSortable: true,
  },
  {
    id: 'description',
    label: 'Descrição',
  },
  {
    id: 'type.value',
    label: 'Pesagem',
  },
  {
    id: 'clientBalance',
    label: 'Saldo',
    isSortable: true,
  },
  {
    id: 'actions',
    label: 'Ações',
    textAlign: 'center',
  },
]
