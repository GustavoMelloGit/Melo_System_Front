import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import validationErrors from '../../../../lib/errors/validation'
import SignInView from '../../view/SignIn/View'
import MockSignInView from '../mock/view/SignIn'

describe('tests signIn View', () => {
  test('render signin view without context provider', () => {
    expect(() => render(<SignInView />)).toThrowError('useAuth must be used within a AuthProvider')
  })

  test('render signin view with context provider but with a null value', () => {
    expect(() => render(<SignInView />)).toThrowError('useAuth must be used within a AuthProvider')
  })

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
    submitButton.click()

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

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
    submitButton.click()

    await waitFor(() => {
      const invalidEmailError = screen.getByText(validationErrors.emailIsInvalid)

      expect(invalidEmailError).toBeInTheDocument()
    })
  })
})
