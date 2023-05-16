import CoffeeAccountTable from '../../components/Table'
import useCoffeeAccountView from './useView'

export default function CoffeeAccountView(): JSX.Element {
  const { data, isLoading, total, handleOpenCreateCoffee } = useCoffeeAccountView()

  return (
    <CoffeeAccountTable
      data={data}
      isLoading={isLoading}
      totalLength={total}
      onClickAdd={handleOpenCreateCoffee}
    />
  )
}
