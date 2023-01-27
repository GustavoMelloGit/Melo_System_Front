import { type Meta, type StoryObj } from '@storybook/react'
import RHFField, { type FormInputProps } from '.'
export default {
  title: 'RHFField',
  component: RHFField,
  args: {
    register: Function as any,
  },
  decorators: [
    (Story: any) => {
      return <Story />
    },
  ],
} as Meta<FormInputProps<any>>

export const Default: StoryObj = {}
