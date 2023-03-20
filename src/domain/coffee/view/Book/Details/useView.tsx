import { useParams } from 'react-router-dom'
import { type KeyedMutator } from 'swr'
import useServiceParams from '../../../../../shared/hooks/useServiceParams'
import { getSheetsService } from '../../../services/Sheets/get'
import { type SheetModel } from '../../../types/model/book'

export default function useBookDetailsView(): UseBookDetailsView {
  const { number } = useParams<{ number: string }>()
  const params = useServiceParams()
  const { data, isLoading, error, mutate, total } = getSheetsService(number, params)

  return {
    data,
    isLoading,
    error,
    mutate,
    total: total ?? 0,
  }
}

type UseBookDetailsView = {
  data: SheetModel[] | undefined
  isLoading: boolean
  error: string | undefined
  mutate: KeyedMutator<SheetModel[]> | undefined
  total: number
}
