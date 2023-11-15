import { createEmitter } from '../../../../../../../lib/utils/createEmitter'
import { type EscolhaTransactionModel } from '../../../../../types/model/Transaction'
import { type BuyEscolhaFormValues } from '../types/esolha'

export const EscolhaAccountEmitter = createEmitter<{
  escolhaCreated: EscolhaTransactionModel
  escolhaBought: BuyEscolhaFormValues
}>()
