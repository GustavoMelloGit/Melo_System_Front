import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'
import { toast } from 'react-hot-toast'
import { setAuthToken } from '../../../lib/config/api'
import useLocalStorage from '../../../shared/hooks/useLocalStorage'
import { signInService } from '../service'
import { type SignInValues } from '../types'
import { type AuthContextType } from '../types/context/auth'

const defaultValues: AuthContextType = {
  user: {} as AuthContextType['user'],
  signIn: async () => {},
  signOut: async () => {},
  appInitialized: false,
}

export const AuthContext = createContext<AuthContextType>(defaultValues)

export const AuthProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const [user, setUser] = useState<AuthContextType['user']>(defaultValues.user)
  const [appInitialized, setAppInitialized] = useState(false)
  const { setValue, getValue, removeValue: removeUser } = useLocalStorage('@melo-system:user')
  const {
    setValue: setToken,
    getValue: getToken,
    removeValue: removeToken,
  } = useLocalStorage('@melo-system:token')

  const signIn = useCallback(async (values: SignInValues): Promise<void> => {
    const { data, error } = await signInService(values)
    setAppInitialized(true)
    if (error ?? !data) {
      toast.error(error)
      return
    }
    const authenticateUser = { ...data.user }
    const { token } = data
    setUser(authenticateUser)
    setValue(authenticateUser)
    setAuthToken(token)
    setToken(token)
  }, [])

  const signOut = useCallback(async (): Promise<void> => {
    try {
      setUser(defaultValues.user)
      removeUser()
      removeToken()
    } catch (e) {
      toast.error('Erro ao sair da aplicação')
    }
  }, [])

  useEffect(() => {
    const user = getValue()
    const token = getToken()
    setAppInitialized(true)
    if (token) {
      setAuthToken(token)
    }
    if (user) {
      setUser(user)
    }
  }, [])

  const values = useMemo(
    () => ({ user, signIn, signOut, appInitialized }),
    [user, signIn, signOut, appInitialized],
  )

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}
