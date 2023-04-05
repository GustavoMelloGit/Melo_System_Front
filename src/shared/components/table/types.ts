import {
  type InputProps,
  type TableColumnHeaderProps,
  type TableProps as ChakraTableProps,
} from '@chakra-ui/react'

export type CustomTableComponentProps<TData> = {
  data: TData | undefined
  isLoading: boolean
  totalLength: number
}
export type TableRowProps = {
  isLoading: boolean
  children?: React.ReactNode
  dataLength: number
  noDataMessage?: string
}

export type TableHeaderColumns<T = string> = Omit<TableColumnHeaderProps, 'id'> & {
  id: T extends Record<string, unknown> ? keyof T : T
  label: string
  isSortable?: boolean
  align?: 'left' | 'right' | 'center'
  defaultSort?: 'asc' | 'desc'
}
export type TableHeaderProps = {
  columns: TableHeaderColumns[]
}

export type TablePaginationProps = {
  dataLength: number
  totalLength: number
}

export type SearchForOption = Record<
  string,
  {
    label: string
    inputProps?: InputProps
  }
>
export type TableFilterProps = {
  searchForOptions: SearchForOption
  actions?: React.ReactNode
}

export type TableProps = {
  header: TableHeaderProps
  rows: TableRowProps
  pagination: TablePaginationProps
  filter?: TableFilterProps
  children: React.ReactNode
  table?: ChakraTableProps & Record<`data-${string}`, string>
}
export type FilterFormValues = {
  query: string
  searchFor: string
}
