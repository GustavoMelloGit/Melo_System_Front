import FertilizerAccountTable from '../../components/Table'
import useFertilizerAccountView from './useView'

export default function FertilizerAccountView(): JSX.Element {
  const { data, handleOpenSellModal, isLoading } = useFertilizerAccountView()

  return (
    <FertilizerAccountTable
      data={data?.data}
      isLoading={isLoading}
      totalLength={data?.total ?? 0}
      onClickSell={handleOpenSellModal}
    />
  )
}
