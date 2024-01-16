import { useParams } from 'react-router-dom'
import { useGetSheetService } from '../../../services/Sheets'
import { type SheetFormValues } from '../../../types/model/sheet'

export default function useSheetDetailsView(): UseUpdateSheetView {
  const { bookNumber, sheetNumber } = useParams<{ bookNumber: string; sheetNumber: string }>()
  const { data } = useGetSheetService(
    bookNumber && sheetNumber ? { bookNumber, sheetNumber } : undefined,
  )

  const initialValues: SheetFormValues = data
    ? {
        clientId: data.clientId,
        clientName: data.client.name,
        coffeeDetails: data.coffeeDetails,
        courier: data.courier,
        weighingDate: new Date(data.weighingDate).toISOString().split('T')[0],
        isDraft: data.isDraft,
        lines: data.lines,
        number: data.number,
      }
    : {
        clientId: '',
        clientName: '',
        courier: '',
        isDraft: false,
        number: 0,
        weighingDate: new Date().toISOString().split('T')[0],
        coffeeDetails: {
          picking: 0,
          foulness: 0,
          drilled: 0,
          moisture: 0,
          sieve: 0,
          bebida: 'duro',
          coffeeType: 'bica_corrida',
        },
        lines: [{ bags: 0, weight: 0 }],
      }

  return {
    initialValues,
    bookNumber,
    sheetNumber,
  }
}

type UseUpdateSheetView = {
  initialValues: SheetFormValues
  bookNumber: string | undefined
  sheetNumber: string | undefined
}
