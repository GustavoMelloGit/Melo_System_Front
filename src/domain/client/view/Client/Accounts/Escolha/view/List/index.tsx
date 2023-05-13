import EscolhaAccountTable from '../../components/Table'
import useEscolhaAccountView from './useView'

export default function EscolhaAccountView(): JSX.Element {
  const { data, isLoading, total, handleOpenCreateEscolha } = useEscolhaAccountView()
  return (
    <EscolhaAccountTable
      data={data}
      isLoading={isLoading}
      totalLength={total}
      onClickAdd={handleOpenCreateEscolha}
    />
  )
}
