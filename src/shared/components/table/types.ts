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

export type SearchForOption = {
  label: string
  value: string
}
export type TableFilterProps = {
  searchForOptions: SearchForOption[]
}

export type TableProps = {
  header: TableHeaderProps
  rows: TableRowProps
  pagination: TablePaginationProps
  filter: TableFilterProps
  children: React.ReactNode
}
