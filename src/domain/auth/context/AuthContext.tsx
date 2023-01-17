import { createContext, PropsWithChildren, useCallback, useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'
import { auth } from '../../../config/firebase'
import { signInService } from '../service'
import { SignInValues } from '../types'
import { AuthContextType } from '../types/context/auth'

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const [user, setUser] = useState<AuthContextType['user'] | null>(null)
  const signIn = useCallback(async (values: SignInValues): Promise<void> => {
    const { data, error } = await signInService(values)
    if (error) {
      toast.error(error)
      return
    }
    setUser(data)
  }, [])

  const signOut = useCallback(async (): Promise<void> => {
    try {
      await auth.signOut()
      setUser(null)
    } catch (e) {
      console.log(e)
    }
  }, [])

  const values = useMemo(() => ({ user, signIn, signOut }), [user, signIn, signOut])

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}
