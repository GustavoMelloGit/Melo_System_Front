import SacariaAccountTable from '../../components/Table'
import useSacariaAccountView from './useView'

export default function SacariaAccountView(): JSX.Element {
  const { data, isLoading, total, handleCreate } = useSacariaAccountView()

  return (
    <SacariaAccountTable
      data={data}
      onClickAdd={handleCreate}
      isLoading={isLoading}
      totalLength={total}
    />
  )
}
