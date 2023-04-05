import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useModal } from '../../../../../../../shared/hooks/useModal'
import { useFeeStore, type TransactionSelected } from '../../stores/useFeeStore'
import FeeModal from '../FeeModal'

export default function useTransactionTable(): UseTransactionTable {
  const openModal = useModal((state) => state.openModal)
  const location = useLocation()
  const {
    addSelectedTransaction: addSelectedFee,
    removeSelectedTransaction: removeSelectedFee,
    selectionMode,
    selectedTransactions,
    updateSelectedTransaction: updateSelectedFee,
    setSelectionMode,
    resetStore,
  } = useFeeStore()

  const onSelectFee = (fee: TransactionSelected): void => {
    const feeAlreadySelected = selectedTransactions.find((fees) => fees.id === fee.id)
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
    const hasSelectedFees = selectedTransactions.length > 0
    if (!selectionMode) {
      setSelectionMode(true)
    } else if (selectionMode && !hasSelectedFees) setSelectionMode(false)
    else {
      openModal(<FeeModal />)
      setSelectionMode(false)
    }
  }

  useEffect(() => {
    if (selectionMode) resetStore()
  }, [location])

  return {
    onSelectFee,
    selectionMode,
    handleClickFee,
  }
}

export type OnSelectFee = (fee: TransactionSelected) => void
export type UseTransactionTable = {
  onSelectFee: OnSelectFee
  selectionMode: boolean
  handleClickFee: () => void
}
