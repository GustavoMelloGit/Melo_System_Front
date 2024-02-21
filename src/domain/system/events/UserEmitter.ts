import { createEmitter } from '../../../lib/utils/createEmitter'
import { type AddUserFormValues } from '../components/Users/AddUser/types'

export const UserEmitter = createEmitter<{
  userCreated: AddUserFormValues
  userDeleted: string
}>()
