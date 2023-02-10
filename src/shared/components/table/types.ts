export type TableRowProps = {
  isLoading: boolean
  children?: React.ReactNode
  dataLength: number
  noDataMessage?: string
}

export type TableHeaderColumns = {
  id: string
  label: string
  isSortable?: boolean
  align?: 'left' | 'right' | 'center'
}
export type TableHeaderProps = {
  columns: TableHeaderColumns[]
}

export type TablePaginationProps = {
  dataLength: number
  totalLength: number
}

export type SearchForOption = {
  label: string
  value: string
}
export type TableFilterProps = {
  searchForOptions: SearchForOption[]
  actions?: React.ReactNode
}

export type TableProps = {
  header: TableHeaderProps
  rows: TableRowProps
  pagination: TablePaginationProps
  filter: TableFilterProps
  children: React.ReactNode
}
