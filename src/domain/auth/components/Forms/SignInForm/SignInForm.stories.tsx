import { Center } from '@chakra-ui/react'
import { type ComponentMeta, type ComponentStory } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'
import SignInForm from '.'

export default {
  title: 'Auth/SignInForm',
  component: SignInForm,
  decorators: [
    (Story) => (
      <Center>
        <Story />
      </Center>
    ),
  ],
} as ComponentMeta<typeof SignInForm>

const Template: ComponentStory<typeof SignInForm> = (args) => <SignInForm {...args} />

export const Default = Template.bind({})

export const Filled = Template.bind({})
Filled.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  const emailInput = canvas.getByRole('textbox', { name: /email/i })

  await userEvent.type(emailInput, 'test@test.com', {
    delay: 100,
  })

  const passwordInput = canvas.getByLabelText(/senha/i)

  await userEvent.type(passwordInput, '123456', {
    delay: 100,
  })

  const button = canvas.getByRole('button', { name: /login/i })

  userEvent.click(button)
}

export const FilledError = Template.bind({})
FilledError.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  const emailInput = canvas.getByRole('textbox', { name: /email/i })

  await userEvent.type(emailInput, 'invalid-email', {
    delay: 100,
  })

  const passwordInput = canvas.getByLabelText(/senha/i)

  await userEvent.type(passwordInput, '123456', {
    delay: 100,
  })

  const button = canvas.getByRole('button', { name: /login/i })

  userEvent.click(button)
}
