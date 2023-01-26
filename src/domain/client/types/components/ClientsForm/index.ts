import { type UseFormReturn } from 'react-hook-form'
import { type ClientModel } from '../../model/Client'

export type ClientFormValues = ClientModel

export type UseClientForm = {
  form: UseFormReturn<ClientFormValues, any>
}
