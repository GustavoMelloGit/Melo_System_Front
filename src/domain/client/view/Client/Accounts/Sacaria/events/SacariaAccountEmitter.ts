import { createEmitter } from '../../../../../../../lib/utils/createEmitter'
import { type SacariaFormValues } from '../types/sacaria'

export const SacariaAccountEmitter = createEmitter<{
  sacariaCreated: SacariaFormValues
}>()
