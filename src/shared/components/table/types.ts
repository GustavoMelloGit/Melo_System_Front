export type TableRowProps = {
  isLoading: boolean
  children?: React.ReactNode
  dataLength: number
  noDataMessage?: string
}

export type TableHeaderColumns = {
  id: string
  label: string
}
export type TableHeaderProps = {
  columns: TableHeaderColumns[]
}

export type TablePaginationProps = {
  dataLength: number
  onNextPage?: () => void
  onPreviousPage?: () => void
  onRowsPerPageChange?: (rowsPerPage: number) => void
}

export type TableProps = {
  header: TableHeaderProps
  rows: TableRowProps
  pagination: TablePaginationProps
  children: React.ReactNode
}
