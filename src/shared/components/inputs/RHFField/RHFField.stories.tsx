import { type ComponentMeta, type ComponentStory } from '@storybook/react'
import RHFField from '.'

export default {
  title: 'components/inputs/RHFField',
  component: RHFField,
  args: {
    register: Function as any,
  },
  argTypes: {
    label: {
      control: 'text',
    },
    type: {
      control: 'radio',
      options: ['text', 'email', 'password', 'date'],
    },
  },
} as ComponentMeta<typeof RHFField>

const Template: ComponentStory<typeof RHFField> = (args) => <RHFField {...args} />

export const Default = Template.bind({})
