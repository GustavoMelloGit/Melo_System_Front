import { createEmitter } from '../../../lib/utils/createEmitter'

export const SheetsEmitter = createEmitter<{
  removeSheet: number
}>()
