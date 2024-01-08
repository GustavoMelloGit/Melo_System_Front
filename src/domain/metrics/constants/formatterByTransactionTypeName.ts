import { formatCurrency } from '../../../lib/utils/formatters'
import { getNumberOfBags } from '../../../lib/utils/getNumberOfBags'
import { type TransactionTypeName } from '../../client/types/model/Transaction'

export const formatterByTransactionTypeName: Record<
  TransactionTypeName,
  (value: number) => string | number
> = {
  bags: (value) => `${value} Sacas`,
  currency: formatCurrency,
  escolha: getNumberOfBags,
  fertilizer: (value) => `${value} Sacos`,
  duro: getNumberOfBags,
  duro_riado: getNumberOfBags,
  rio: getNumberOfBags,
  rio_velho: getNumberOfBags,
  rio_zona: getNumberOfBags,
  riado: getNumberOfBags,
  riado_rio: getNumberOfBags,
  duro_riado_rio: getNumberOfBags,
}
