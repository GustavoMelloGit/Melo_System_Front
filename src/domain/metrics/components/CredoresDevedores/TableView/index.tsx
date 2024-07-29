import { Td, Tr } from '@chakra-ui/react'
import { Currency } from '../../../../../lib/utils/Currency'
import { formatCurrency } from '../../../../../lib/utils/formatters'
import CurrencyInput from '../../../../../shared/components/inputs/CurrencyInput'
import Table from '../../../../../shared/components/table/Table'
import {
  type SearchForOption,
  type TableHeaderColumns,
} from '../../../../../shared/components/table/types'
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
      filter={{
        searchForOptions,
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

const searchForOptions: SearchForOption = {
  searchableName: { label: 'Nome' },
  code: { label: 'Código' },
  searchableNickname: { label: 'Apelido' },
  'address.brook': { label: 'Córrego' },
  greaterThan: {
    label: 'Saldo Maior Que',
    // eslint-disable-next-line react/prop-types
    Input: ({ onChange, value, ...field }) => {
      return (
        <CurrencyInput
          {...field}
          initialValue={Number(value) / 100}
          setValue={(value) => {
            onChange(String(Currency.currencyToCents(value)))
          }}
        />
      )
    },
  },
}
