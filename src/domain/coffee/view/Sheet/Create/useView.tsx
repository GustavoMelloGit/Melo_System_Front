import { toast } from 'react-hot-toast'
import { PaginationParams } from '../../../../../lib/constants/pagination'
import { createSheetService, getSheetsService } from '../../../services/Sheets'
import { type SheetFormValues } from '../../../types/model/sheet'
import { formatCoffeeDetails } from '../../../utils/Sheet'

type Props = {
  bookNumber: string | number | undefined
}
export default function useCreateSheetView({ bookNumber }: Props): UseCreateSheetView {
  const { data, mutate: refetchLastLine } = getSheetsService(
    bookNumber,
    `${PaginationParams.sortBy}=number&${PaginationParams.sortOrder}=desc&limit=1`,
  )

  async function handleCreateSheet({ clientId, ...values }: SheetFormValues): Promise<void> {
    if (!bookNumber) return

    const formattedCoffeeDetails = formatCoffeeDetails(values.coffeeDetails)
    values.coffeeDetails = formattedCoffeeDetails

    const { error } = await createSheetService(values, clientId, bookNumber)
    if (error) {
      toast.error(error)
      throw new Error(error)
    }
    await refetchLastLine()
    toast.success('Folha criada com sucesso')
  }

  const initialValues: SheetFormValues = {
    clientId: '',
    clientName: '',
    number: (data?.data?.[0]?.number ?? 0) + 1,
    isDraft: false,
    courier: '',
    weighingDate: new Date().toISOString().split('T')[0],
    coffeeDetails: {
      coffeeType: 'bica_corrida',
      picking: 0,
      foulness: 0,
      drilled: 0,
      moisture: 0,
      sieve: 0,
      utilization: 0,
      bebida: 'duro',
      description: '',
    },
    lines: [{ bags: 0, weight: 0 }],
  }

  return {
    initialValues,
    createSheet: handleCreateSheet,
  }
}

type UseCreateSheetView = {
  initialValues: SheetFormValues
  createSheet: (values: SheetFormValues) => Promise<void>
}
