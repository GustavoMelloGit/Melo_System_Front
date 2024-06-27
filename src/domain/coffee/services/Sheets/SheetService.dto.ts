export type GetSheetsInputDto = {
  bookNumber?: string | number
  params?: string
}

export type GetSheetInputDto = {
  sheetNumber: string | number
  bookNumber: string | number
}
