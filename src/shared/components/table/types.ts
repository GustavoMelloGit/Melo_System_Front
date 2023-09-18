import {
  type InputProps,
  type TableColumnHeaderProps,
  type TableProps as ChakraTableProps,
} from '@chakra-ui/react'
import { type ControllerRenderProps } from 'react-hook-form'

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

// -------------------------------- Header Properties --------------------------------

export type TableHeaderColumns<T = string> = Omit<TableColumnHeaderProps, 'id'> & {
  id: T extends Record<string, unknown> ? keyof T : T
  label: string
  isSortable?: boolean
  align?: 'left' | 'right' | 'center'
}
export type TableHeaderProps = {
  columns: TableHeaderColumns[]
}

// -------------------------------- Pagination Properties --------------------------------

export type TablePaginationProps = {
  totalLength: number
  showPagination?: boolean
}

// -------------------------------- Filter Properties --------------------------------

export type FilterInputProps = InputProps & {
  valueGetter?: (value: string) => string
}

type InputParams = ControllerRenderProps<FilterFormValues, 'query'>

type Input = (params: InputParams) => JSX.Element
export type SearchForOption = Record<
  string,
  {
    label: string
    inputProps?: FilterInputProps
    Input?: Input
  }
>
export type TableFilterProps = {
  searchForOptions: SearchForOption
  actions?: React.ReactNode
}
export type FilterFormValues = {
  query: string
  searchFor: string
}

// -------------------------------- Table Properties --------------------------------

export type TableProps = {
  header: TableHeaderProps
  rows: TableRowProps
  pagination: TablePaginationProps
  filter?: TableFilterProps
  children: React.ReactNode
  table?: ChakraTableProps & Record<`data-${string}`, string>
}
