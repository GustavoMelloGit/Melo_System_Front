import { PropsWithChildren } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { AuthContextType } from '../../../types/context/auth'

export default function MockAuthContextProvider({ children }: PropsWithChildren): JSX.Element {
  const providerValue: AuthContextType = {
    user: {
      isAuthenticated: false,
    } as AuthContextType['user'],
    signIn: jest.fn(),
    signOut: jest.fn(),
  }

  return <AuthContext.Provider value={providerValue}>{children}</AuthContext.Provider>
}
