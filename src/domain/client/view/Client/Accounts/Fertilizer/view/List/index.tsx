import { toast } from 'react-hot-toast'
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

  async function handleOpenSellModal(): Promise<void> {
    if (!uuid) {
      toast.error('Não foi possível abrir a modal de venda de fertilizante')
      return
    }
    const SellFertilizer = (await import('../../components/Sell')).default
    openModal(<SellFertilizer refetch={mutate} clientId={uuid} />)
  }

  return (
    <FertilizerAccountTable
      data={data?.data}
      isLoading={isLoading}
      totalLength={data?.total ?? 0}
      onClickSell={handleOpenSellModal}
    />
  )
}
