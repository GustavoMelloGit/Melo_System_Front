import { type EscolhaDetails } from '../../../../../../coffee/types/model/coffee'

export type EscolhaFormValues = {
  date: string
  bags: number
  weight: number
  details: Pick<EscolhaDetails, 'foulness' | 'utilization'>
  description?: string
}

export type CreateEscolhaValues = {
  clientId: string
  date: string
  value: number
  details: Pick<EscolhaDetails, 'foulness' | 'utilization'> | undefined
  description?: string
}
