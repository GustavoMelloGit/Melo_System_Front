import { type ComponentMeta, type StoryObj } from '@storybook/react'
import RHFField from '.'
export default {
  title: 'components/inputs/RHFField',
  component: RHFField,
  args: {
    register: Function as any,
  },
} as ComponentMeta<typeof RHFField>

export const Default: StoryObj = {}
Default.args = {}
