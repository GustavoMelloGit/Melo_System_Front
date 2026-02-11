import { Td, Tr } from '@chakra-ui/react'
import { formatCurrency } from '../../../../../lib/utils/formatters'
import { getNumberOfBags } from '../../../../../lib/utils/getNumberOfBags'
import Table from '../../../../../shared/components/table/Table'
import { type TableHeaderColumns } from '../../../../../shared/components/table/types'
import { type GetListResponse } from '../../../../../shared/types/service/GetListResponse'
import { type OwingCurrencyWithPositiveCoffeeClient } from '../../../types/owingCurrencyWithPositiveCoffee'
import OwingCurrencyWithPositiveCoffeeMetricsTableViewRow from './Row'

function getCoffeeBalance(client: OwingCurrencyWithPositiveCoffeeClient): number {
  if (client.coffeeBalance !== undefined) return client.coffeeBalance
  if (client.coffeeWeight !== undefined) return client.coffeeWeight
  return client.balances?.coffee ?? 0
}

type Props = {
  data?: GetListResponse<OwingCurrencyWithPositiveCoffeeClient[]>
  isLoading: boolean
}

export default function OwingCurrencyWithPositiveCoffeeMetricsTableView({
  data,
  isLoading,
}: Props): JSX.Element {
  const clients = data?.data ?? []
  const totalCurrency = clients.reduce((acc, curr) => acc + curr.balance, 0)
  const totalCoffee = clients.reduce((acc, curr) => acc + getCoffeeBalance(curr), 0)

  return (
    <Table
      header={{
        columns: headerColumns,
      }}
      rows={{
        isLoading,
        dataLength: clients.length,
        noDataMessage: 'Nenhum dado encontrado',
      }}
      pagination={{
        totalLength: data?.total ?? 0,
        showPagination: true,
      }}
      footer={
        clients.length ? (
          <Tr>
            <Td>TOTAL</Td>
            <Td></Td>
            <Td>{formatCurrency(totalCurrency)}</Td>
            <Td>{getNumberOfBags(totalCoffee)}</Td>
          </Tr>
        ) : null
      }
    >
      {clients.map((client) => (
        <OwingCurrencyWithPositiveCoffeeMetricsTableViewRow key={client.id} client={client} />
      ))}
    </Table>
  )
}

const headerColumns: TableHeaderColumns[] = [
  { id: 'code', label: 'Código', isSortable: true },
  { id: 'name', label: 'Cliente', isSortable: true },
  { id: 'balance', label: 'Saldo conta corrente', isSortable: true },
  { id: 'coffee', label: 'Saldo café', isSortable: true },
]
