import { type ComponentMeta, type Story } from '@storybook/react'
import Table from './Table'
import { type SearchForOption, type TableHeaderColumns, type TableProps } from './types'

const mockColumns: TableHeaderColumns[] = [
  {
    id: 'id',
    label: 'ID',
  },
  {
    id: 'name',
    label: 'Name',
    isSortable: true,
  },
]
const mockSearchForOptions: SearchForOption = {
  id: {
    label: 'ID',
  },
  name: {
    label: 'Name',
  },
}

export default {
  title: 'components/Table',
  component: Table,
  args: {
    register: Function as any,
    header: {
      columns: mockColumns,
    },
    filter: {
      searchForOptions: mockSearchForOptions,
    },
  },
} as ComponentMeta<typeof Table>

const Template: Story<TableProps> = (args) => <Table {...args}>{args.children}</Table>

export const Default = Template.bind({})
Default.args = {
  rows: {
    dataLength: 0,
    isLoading: false,
  },
  pagination: {
    dataLength: 0,
    totalLength: 0,
  },
}
export const LoadingTable = Template.bind({})
LoadingTable.args = {
  rows: {
    dataLength: 0,
    isLoading: true,
  },
  pagination: {
    dataLength: 0,
    totalLength: 0,
  },
  children: null,
}
