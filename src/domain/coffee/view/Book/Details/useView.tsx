import { toast } from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import { getDefaultSortParams } from '../../../../../lib/utils/utils'
import useServiceParams from '../../../../../shared/hooks/useServiceParams'
import { deleteSheetService } from '../../../services/Sheets/delete'
import { getSheetsService } from '../../../services/Sheets/get'
import { type SheetModel } from '../../../types/model/sheet'

export default function useBookDetailsView(): UseBookDetailsView {
  const { number } = useParams<{ number: string }>()

  const params = useServiceParams()
  const { data, isLoading, error, total, mutate } = getSheetsService(
    number,
    params || getDefaultSortParams('number'),
  )

  async function handleDeleteSheet(sheet: SheetModel): Promise<void> {
    const { error } = await deleteSheetService(sheet.number)

    if (error) {
      toast.error(error)
      return
    }

    await mutate()
    toast.success('Folha excluída com sucesso!')
  }

  return {
    data,
    isLoading,
    error,
    total: total ?? 0,
    handleDeleteSheet,
  }
}

type UseBookDetailsView = {
  data: SheetModel[] | undefined
  isLoading: boolean
  error: string | undefined
  total: number
  handleDeleteSheet: (sheet: SheetModel) => Promise<void>
}
