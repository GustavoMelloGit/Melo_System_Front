import { useParams } from 'react-router-dom'
import { useModal } from '../../../../../../../../shared/hooks/useModal'
import useServiceParams from '../../../../../../../../shared/hooks/useServiceParams'
import FertilizerAccountTable from '../../components/Table'
import { getFertilizerTransactionService } from '../../services/get'

export default function FertilizerAccountView(): JSX.Element {
  const { uuid } = useParams()
  const params = useServiceParams()
  const openModal = useModal((state) => state.openModal)

  const { data, isLoading, mutate } = getFertilizerTransactionService(uuid, params)

  async function openSellModalHandler(): Promise<void> {
    const SellFertilizer = (await import('../../components/Sell')).default
    openModal(<SellFertilizer refetch={mutate} />)
  }

  return (
    <FertilizerAccountTable
      data={data?.data}
      isLoading={isLoading}
      totalLength={data?.total ?? 0}
      onClickSell={openSellModalHandler}
    />
  )
}
