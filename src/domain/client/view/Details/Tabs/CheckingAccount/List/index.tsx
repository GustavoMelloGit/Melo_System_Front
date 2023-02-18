import TransactionsTable from '../components/TransactionsTable'
import useListTransactionsView from './useView'

export default function ListTransactionsView(): JSX.Element {
  const { data, isLoading, total, handleAddTransaction } = useListTransactionsView()
  return (
    <TransactionsTable
      data={data}
      onClickAdd={handleAddTransaction}
      isLoading={isLoading}
      total={total}
    />
  )
}
