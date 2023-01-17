import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import validationErrors from '../../../../lib/errors/validation'
import MockSignInView from '../mock/view/SignIn'

describe('tests signIn View', () => {
  test('render signin view with context provider and a value', () => {
    render(<MockSignInView />)
    const loginText = screen.getByRole('heading', { name: /login/i })

    expect(loginText).toBeInTheDocument()
  })
})

describe('tests login form', () => {
  test('submit form with empty values', async () => {
    render(<MockSignInView />)

    const submitButton = screen.getByRole('button', { name: /login/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      const emailRequiredError = screen.getByText(validationErrors.emailIsRequired)
      const passwordRequiredError = screen.getByText(validationErrors.passwordIsRequired)

      expect(emailRequiredError).toBeInTheDocument()
      expect(passwordRequiredError).toBeInTheDocument()
    })
  })

  test('submit form with invalid email', async () => {
    render(<MockSignInView />)

    const emailInput = screen.getByRole('textbox', { name: /email/i })
    const submitButton = screen.getByRole('button', { name: /login/i })

    fireEvent.input(emailInput, { target: { value: 'invalid-email' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      const invalidEmailError = screen.getByText(validationErrors.emailIsInvalid)

      expect(invalidEmailError).toBeInTheDocument()
    })
  })

  test('submit a valid form', async () => {
    render(<MockSignInView />)

    const emailInput = screen.getByRole('textbox', { name: /email/i })
    const passwordInput = screen.getByLabelText(/senha/i)
    const submitButton = screen.getByRole('button', { name: /login/i })

    fireEvent.input(emailInput, { target: { value: 'test@test.com' } })
    fireEvent.input(passwordInput, { target: { value: '123456' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      const emailRequiredError = screen.queryByText(validationErrors.emailIsRequired)
      const passwordRequiredError = screen.queryByText(validationErrors.passwordIsRequired)
      const invalidEmailError = screen.queryByText(validationErrors.emailIsInvalid)

      expect(emailRequiredError).not.toBeInTheDocument()
      expect(passwordRequiredError).not.toBeInTheDocument()
      expect(invalidEmailError).not.toBeInTheDocument()
    })
  })
})
