import { type ComponentMeta, type StoryObj } from '@storybook/react'
import RHFMaskInput from '.'
export default {
  title: 'Inputs/RHFMaskInput',
  component: RHFMaskInput,
  args: {
    register: Function as any,
    mask: 'aaa-000-aaa',
  },
} as ComponentMeta<typeof RHFMaskInput>

export const Default: StoryObj = {}
