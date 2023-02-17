import { shallow } from 'zustand/shallow'
import { useFeeStore, type FeeSelection } from '../../stores/useFeeStore'

export default function useTransactionTable(): UseTransactionTable {
  const { addSelectedFee, removeSelectedFee, selectionMode, selectedFees, updateSelectedFee } =
    useFeeStore(
      (state) => ({
        addSelectedFee: state.addSelectedFee,
        removeSelectedFee: state.removeSelectedFee,
        updateSelectedFee: state.updateSelectedFee,
        selectionMode: state.selectionMode,
        selectedFees: state.selectedFees,
      }),
      shallow,
    )
  console.log('selectedFees', selectedFees)

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

  return {
    onSelectFee,
    selectionMode,
  }
}

export type OnSelectFee = (fee: FeeSelection) => void
export type UseTransactionTable = {
  onSelectFee: OnSelectFee
  selectionMode: boolean
}
