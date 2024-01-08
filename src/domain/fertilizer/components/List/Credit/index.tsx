import { type FertilizerModel } from '../../../types/model/Fertilizer'
import useCreditFertilizerView from './useView'
import CreditFertilizerView from './View'

type Props = {
  fertilizer: FertilizerModel
  refetch: () => void
}
export default function CreditFertilizer({ fertilizer, refetch }: Props): JSX.Element {
  const { closeModal, handleCreditFertilizer } = useCreditFertilizerView()

  return (
    <CreditFertilizerView
      closeModal={closeModal}
      onSubmit={async (values) => {
        await handleCreditFertilizer(fertilizer.id, values)
        refetch()
      }}
      initialValues={{
        quantity: fertilizer.quantity,
      }}
    />
  )
}
