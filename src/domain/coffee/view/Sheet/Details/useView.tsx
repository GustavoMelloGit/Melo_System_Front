import { DEFAULT_WIGHT_PER_BAG } from '../../../constants/coffee'
import { getSheetService } from '../../../services/Sheets'
import { type SheetFormValues } from '../../../types/model/sheet'

type Props = {
  sheetNumber: string | undefined
}
export default function useSheetDetailsView({ sheetNumber }: Props): UseUpdateSheetView {
  const { data } = getSheetService(sheetNumber)

  const initialValues: SheetFormValues = data
    ? {
        clientId: data.clientId,
        coffeeDetails: data.coffeeDetails,
        coffeeType: data.coffeeType,
        courier: data.courier,
        weighingDate: data.weighingDate,
        isDraft: data.isDraft,
        lines: data.lines,
        number: data.number,
        weightPerBag: data.weightPerBag,
      }
    : ({
        number: 0,
        weighingDate: new Date().getTime(),
        weightPerBag: DEFAULT_WIGHT_PER_BAG,
        coffeeDetails: {
          picking: 0,
          foulness: 0,
          drilled: 0,
          moisture: 0,
          sieve: 0,
          type: 'duro',
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
