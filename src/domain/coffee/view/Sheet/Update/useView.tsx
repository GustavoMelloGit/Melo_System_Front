import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { DEFAULT_WIGHT_PER_BAG } from '../../../constants/coffee'
import { getSheetService, updateSheetService } from '../../../services/Sheets'
import { type SheetFormValues } from '../../../types/model/sheet'
import { formatCoffeeDetails } from '../../../utils/Sheet'

type Props = {
  sheetNumber: string | undefined
}
export default function useUpdateSheetView({ sheetNumber }: Props): UseUpdateSheetView {
  const navigate = useNavigate()
  const { data } = getSheetService(sheetNumber)

  async function handleUpdateSheet(values: SheetFormValues): Promise<void> {
    if (!sheetNumber) return
    values.coffeeDetails = formatCoffeeDetails(values.coffeeDetails)

    const { number, ...rest } = values

    const { error } = await updateSheetService(sheetNumber, {
      ...rest,
      ...(values.number !== Number(sheetNumber) && { number: values.number }),
    })

    if (error) {
      toast.error(error)
      throw new Error(error)
    }
    toast.success('Folha atualizada com sucesso')
    navigate(-1)
  }

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
    updateSheet: handleUpdateSheet,
  }
}

type UseUpdateSheetView = {
  initialValues: SheetFormValues
  updateSheet: (values: SheetFormValues) => Promise<void>
}
