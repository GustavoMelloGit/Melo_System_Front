import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'
import { toast } from 'react-hot-toast'
import { auth } from '../../../lib/config/firebase'
import useLocalStorage from '../../../shared/hooks/useLocalStorage'
import { signInService } from '../service'
import { type SignInValues } from '../types'
import { type AuthContextType } from '../types/context/auth'

const defaultValues: AuthContextType = {
  user: {
    isAuthenticated: false,
  } as AuthContextType['user'],
  signIn: async () => {},
  signOut: async () => {},
  appInitialized: false,
}

export const AuthContext = createContext<AuthContextType>(defaultValues)

export const AuthProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const [user, setUser] = useState<AuthContextType['user']>(defaultValues.user)
  const [appInitialized, setAppInitialized] = useState(false)
  const { setValue, getValue, removeValue } = useLocalStorage('@melo-system:user')

  const signIn = useCallback(async (values: SignInValues): Promise<void> => {
    const { data, error } = await signInService(values)
    if (error ?? !data) {
      toast.error(error)
      return
    }
    setUser(data)
    setValue(data)
  }, [])

  const signOut = useCallback(async (): Promise<void> => {
    try {
      await auth.signOut()
      setUser(defaultValues.user)
      removeValue()
    } catch (e) {
      toast.error('Erro ao sair da aplicação')
    }
  }, [])

  useEffect(() => {
    const user = getValue()
    if (user) {
      setUser(user)
      setAppInitialized(true)
    }
  }, [])

  const values = useMemo(
    () => ({ user, signIn, signOut, appInitialized }),
    [user, signIn, signOut, appInitialized],
  )

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}
