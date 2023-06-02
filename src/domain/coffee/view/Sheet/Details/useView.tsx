import { getSheetService } from '../../../services/Sheets'
import { type SheetFormValues } from '../../../types/model/sheet'

type Props = {
  sheetNumber: string | undefined
}
export default function useSheetDetailsView({ sheetNumber }: Props): UseUpdateSheetView {
  const { data } = getSheetService(sheetNumber)

  const initialValues: SheetFormValues = data
    ? {
        clientId: data.data.clientId,
        coffeeDetails: data.data.coffeeDetails,
        courier: data.data.courier,
        weighingDate: new Date(data.data.weighingDate).toISOString().split('T')[0],
        isDraft: data.data.isDraft,
        lines: data.data.lines,
        number: data.data.number,
      }
    : ({
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
      } as SheetFormValues)

  return {
    initialValues,
  }
}

type UseUpdateSheetView = {
  initialValues: SheetFormValues
}
