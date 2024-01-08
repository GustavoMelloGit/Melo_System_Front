import { createEmitter } from '../../../../../../../lib/utils/createEmitter'
import { type CheckingAccountFormValues } from '../../../../../types/model/CheckingAccount'

export const CheckingAccountEmitter = createEmitter<{
  transactionCreated: CheckingAccountFormValues
}>()
