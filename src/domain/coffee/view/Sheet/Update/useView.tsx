import { format } from 'date-fns'
import { toast } from 'react-hot-toast'
import { getSheetService, updateSheetService } from '../../../services/Sheets'
import { type SheetFormValues } from '../../../types/model/sheet'
import { formatCoffeeDetails } from '../../../utils/Sheet'

type Props = {
  sheetNumber: string | undefined
}
export default function useUpdateSheetView({ sheetNumber }: Props): UseUpdateSheetView {
  const { data } = getSheetService(sheetNumber)

  async function handleUpdateSheet(values: SheetFormValues): Promise<void> {
    if (!sheetNumber) return

    const formattedCoffeeDetails = formatCoffeeDetails(values.coffeeDetails)
    values.coffeeDetails = formattedCoffeeDetails

    const { error } = await updateSheetService(sheetNumber, values)
    if (error) {
      toast.error(error)
      throw new Error(error)
    }
    toast.success('Folha atualizada com sucesso')
  }

  const initialValues: SheetFormValues = data
    ? {
        clientId: data.clientId,
        coffeeDetails: data.coffeeDetails,
        coffeeType: data.coffeeType,
        courier: data.courier,
        weighingDate: format(new Date(data.weighingDate), 'yyyy-MM-dd'),
        isDraft: data.isDraft,
        lines: data.lines,
        number: data.number,
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
        },
        lines: [{ bags: 0, weight: 0 }],
      } as SheetFormValues)

  return {
    initialValues,
    updateSheet: handleUpdateSheet,
  }
}

type UseUpdateSheetView = {
  initialValues: SheetFormValues
  updateSheet: (values: SheetFormValues) => Promise<void>
}
