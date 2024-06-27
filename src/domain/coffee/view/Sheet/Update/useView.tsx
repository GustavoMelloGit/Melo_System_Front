import { toast } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { SheetService, useGetSheetService } from '../../../services/Sheets'
import { type SheetFormValues } from '../../../types/model/sheet'
import { formatCoffeeDetails } from '../../../utils/Sheet'

export default function useUpdateSheetView(): UseUpdateSheetView {
  const navigate = useNavigate()
  const { bookNumber, sheetNumber } = useParams<{ bookNumber: string; sheetNumber: string }>()
  const { data } = useGetSheetService(
    bookNumber && sheetNumber ? { bookNumber, sheetNumber } : undefined,
  )

  async function handleUpdateSheet(values: SheetFormValues): Promise<void> {
    if (!sheetNumber || !bookNumber) return
    values.coffeeDetails = formatCoffeeDetails(values.coffeeDetails)

    const { number, ...rest } = values

    const { error } = await SheetService.update(bookNumber, sheetNumber, {
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

  const initialValues: SheetFormValues | undefined = data
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
    : undefined

  return {
    initialValues,
    updateSheet: handleUpdateSheet,
    bookNumber,
    sheetNumber,
  }
}

type UseUpdateSheetView = {
  initialValues: SheetFormValues | undefined
  updateSheet: (values: SheetFormValues) => Promise<void>
  bookNumber: string | undefined
  sheetNumber: string | undefined
}
