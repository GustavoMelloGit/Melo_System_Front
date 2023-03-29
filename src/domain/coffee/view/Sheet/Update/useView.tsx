import { type SheetFormValues } from '../../../types/model/sheet'

type Props = {
  bookNumber: string | undefined
  sheetNumber: string | undefined
}
export default function useUpdateSheetView({ bookNumber, sheetNumber }: Props): UseUpdateSheetView {
  return {
    initialValues: {} as SheetFormValues,
    updateSheet: async () => Promise.resolve(),
  }
}

type UseUpdateSheetView = {
  initialValues: SheetFormValues
  updateSheet: (values: SheetFormValues) => Promise<void>
}
