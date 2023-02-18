import { useModal } from '../../../../../../../../shared/hooks/useModal'
import { useFeeStore, type FeeSelection } from '../../stores/useFeeStore'
import FeeModal from '../FeeModal'

export default function useTransactionTable(): UseTransactionTable {
  const openModal = useModal((state) => state.openModal)
  const {
    addSelectedFee,
    removeSelectedFee,
    selectionMode,
    selectedFees,
    updateSelectedFee,
    setSelectionMode,
  } = useFeeStore()

  const onSelectFee = (fee: FeeSelection): void => {
    const feeAlreadySelected = selectedFees.find((fees) => fees.id === fee.id)
    const isSameValue = feeAlreadySelected?.amount === fee.amount
    const hasToRemove = isSameValue && feeAlreadySelected
    const hasToUpdate = !isSameValue && feeAlreadySelected
    if (hasToRemove) {
      removeSelectedFee(fee)
    } else if (hasToUpdate) {
      updateSelectedFee(fee)
    } else {
      addSelectedFee(fee)
    }
  }

  function handleClickFee(): void {
    const hasSelectedFees = selectedFees.length > 0
    if (!selectionMode) setSelectionMode(true)
    else if (selectionMode && !hasSelectedFees) setSelectionMode(false)
    else {
      openModal(<FeeModal />)
      setSelectionMode(false)
    }
  }

  return {
    onSelectFee,
    selectionMode,
    handleClickFee,
  }
}

export type OnSelectFee = (fee: FeeSelection) => void
export type UseTransactionTable = {
  onSelectFee: OnSelectFee
  selectionMode: boolean
  handleClickFee: () => void
}
