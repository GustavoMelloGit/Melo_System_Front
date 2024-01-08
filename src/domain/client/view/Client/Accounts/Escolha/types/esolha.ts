import { type EscolhaDetails } from '../../../../../../coffee/types/model/coffee'

export type EscolhaFormValues = {
  date: string
  bags: number
  weight: number
  details: Pick<EscolhaDetails, 'foulness' | 'utilization'>
  description?: string
}

export type BuyEscolhaFormValues = {
  weight: number
  bags: number
  valuePerWeight: number
  complement?: string
  brook?: string
  description: string
}
export type CreateEscolhaValues = Omit<EscolhaFormValues, 'bags' | 'weight'> & {
  clientId: string
  value: number
}
