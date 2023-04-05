import CoffeeAccountTable from '../../components/List'
import useCoffeeAccountView from './useView'

export default function CoffeeAccountView(): JSX.Element {
  const { data, isLoading, total } = useCoffeeAccountView()

  return <CoffeeAccountTable data={data} isLoading={isLoading} totalLength={total} />
}
