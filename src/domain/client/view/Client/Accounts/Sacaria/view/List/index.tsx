import SacariaAccountTable from '../../components/Table'
import useSacariaAccountView from './useView'

export default function SacariaAccountView(): JSX.Element {
  const { data, isLoading, total } = useSacariaAccountView()

  return <SacariaAccountTable data={data} isLoading={isLoading} totalLength={total} />
}
