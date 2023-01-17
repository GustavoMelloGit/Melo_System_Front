import { render, screen } from '@testing-library/react'
import { AuthContext } from '../../context/AuthContext'
import { AuthContextType } from '../../types/context/auth'
import SignInView from '../../view/SignIn/View'

describe('SignInView', () => {
  test('render signin view without context provider', () => {
    expect(() => render(<SignInView />)).toThrowError('useAuth must be used within a AuthProvider')
  })

  test('render signin view with context provider but with a null value', () => {
    expect(() => render(<SignInView />)).toThrowError('useAuth must be used within a AuthProvider')
  })

  test('render signin view with context provider and a value', () => {
    const providerValue: AuthContextType = {
      user: null,
      signIn: jest.fn(),
      signOut: jest.fn(),
    }

    render(
      <AuthContext.Provider value={providerValue}>
        <SignInView />
      </AuthContext.Provider>,
    )
    const loginText = screen.getByRole('heading', { name: /login/i })

    expect(loginText).toBeInTheDocument()
  })
})
