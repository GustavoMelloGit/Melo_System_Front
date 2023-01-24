import { UseFormReturn } from 'react-hook-form'
import { ClientModel } from '../../model/Client'

export type ClientFormValues = ClientModel

export type UseClientForm = {
  form: UseFormReturn<ClientFormValues, any>
}
