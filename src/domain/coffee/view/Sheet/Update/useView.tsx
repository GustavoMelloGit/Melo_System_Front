import { toast } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { getSheetService, updateSheetService } from '../../../services/Sheets'
import { type SheetFormValues } from '../../../types/model/sheet'
import { formatCoffeeDetails } from '../../../utils/Sheet'

export default function useUpdateSheetView(): UseUpdateSheetView {
  const navigate = useNavigate()
  const { bookNumber, sheetNumber } = useParams<{ bookNumber: string; sheetNumber: string }>()
  const { data } = getSheetService(
    bookNumber && sheetNumber ? { bookNumber, sheetNumber } : undefined,
  )

  async function handleUpdateSheet(values: SheetFormValues): Promise<void> {
    if (!sheetNumber || !bookNumber) return
    values.coffeeDetails = formatCoffeeDetails(values.coffeeDetails)

    const { number, ...rest } = values

    const { error } = await updateSheetService(bookNumber, sheetNumber, {
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
        clientName: data.client.name,
        coffeeDetails: data.coffeeDetails,
        courier: data.courier,
        weighingDate: new Date(data.weighingDate).toISOString().split('T')[0],
        isDraft: data.isDraft,
        lines: data.lines,
        number: data.number,
      }
    : ({
        clientId: '',
        clientName: '',
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
    updateSheet: handleUpdateSheet,
    bookNumber,
    sheetNumber,
  }
}

type UseUpdateSheetView = {
  initialValues: SheetFormValues
  updateSheet: (values: SheetFormValues) => Promise<void>
  bookNumber: string | undefined
  sheetNumber: string | undefined
}
