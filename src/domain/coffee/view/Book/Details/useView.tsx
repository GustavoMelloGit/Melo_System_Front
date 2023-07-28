import { useCallback, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import { getDefaultSortParams } from '../../../../../lib/utils/utils'
import useServiceParams from '../../../../../shared/hooks/useServiceParams'
import { SheetsEmitter } from '../../../events/sheets'
import { deleteSheetService } from '../../../services/Sheets/delete'
import { getSheetsService } from '../../../services/Sheets/get'
import { type SheetModel } from '../../../types/model/sheet'

export default function useBookDetailsView(): UseBookDetailsView {
  const { number } = useParams<{ number: string }>()

  const params = useServiceParams()
  const { data, isLoading, error, mutate } = getSheetsService({
    bookNumber: number,
    params: params || getDefaultSortParams('number'),
  })

  const handleDeleteSheet = useCallback(
    async (sheetNumber: number): Promise<void> => {
      const { error } = await deleteSheetService(sheetNumber)

      if (error) {
        toast.error(error)
        return
      }

      await mutate()
      toast.success('Folha excluída com sucesso!')
    },
    [mutate],
  )

  useEffect(() => {
    SheetsEmitter.on('removeSheet', handleDeleteSheet)

    return () => {
      SheetsEmitter.off('removeSheet', handleDeleteSheet)
    }
  }, [])

  return {
    data: data?.data,
    isLoading,
    error,
    total: data?.total ?? 0,
  }
}

type UseBookDetailsView = {
  data: SheetModel[] | undefined
  isLoading: boolean
  error: string | undefined
  total: number
}
