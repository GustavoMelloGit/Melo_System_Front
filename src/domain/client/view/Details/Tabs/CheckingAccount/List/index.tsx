import TransactionsTable from '../components/TransactionsTable'
import useListTransactionsView from './useView'

export default function ListTransactionsView(): JSX.Element {
  const { data, isLoading, total } = useListTransactionsView()
  return <TransactionsTable data={data} isLoading={isLoading} total={total} />
}
