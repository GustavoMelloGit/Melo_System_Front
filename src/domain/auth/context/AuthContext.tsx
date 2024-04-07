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
import StorageManager from '../../../lib/utils/StorageManager'
import { signInService, verifyTokenService } from '../service'
import { type SignInValues } from '../types'
import { type AuthContextType } from '../types/context/auth'
import { type UserModel } from '../types/model/user'

const defaultValues: AuthContextType = {
  user: {} as AuthContextType['user'],
  signIn: async () => {},
  signOut: () => {},
  appInitialized: false,
}

export const AuthContext = createContext<AuthContextType>(defaultValues)

export const AuthProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const [user, setUser] = useState<AuthContextType['user']>(defaultValues.user)
  const [appInitialized, setAppInitialized] = useState(false)
  const { setValue, getValue, removeValue: removeUser } = StorageManager<UserModel>('user')
  const {
    setValue: setToken,
    getValue: getToken,
    removeValue: removeToken,
  } = StorageManager<string | null>('token')

  const signIn = useCallback(
    async (values: SignInValues): Promise<void> => {
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
    },
    [setToken, setValue],
  )

  const signOut = useCallback(async (): Promise<void> => {
    try {
      setUser(defaultValues.user)
      removeUser()
      removeToken()
    } catch (e) {
      toast.error('Erro ao sair da aplicação')
    }
  }, [removeToken, removeUser])

  const isTokenValid = useCallback(async (): Promise<boolean> => {
    const { error } = await verifyTokenService()
    return !error
  }, [])

  const persistUser = useCallback(async (): Promise<void> => {
    const token = getToken()
    if (!token) return
    setAuthToken(token)
    const isValidToken = await isTokenValid()
    setAppInitialized(true)
    if (!isValidToken) {
      await signOut()
      return
    }
    const user = getValue()
    if (user && token) {
      setUser(user)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    void persistUser()
  }, [persistUser])

  const values = useMemo(
    () => ({ user, signIn, signOut, appInitialized }),
    [user, signIn, signOut, appInitialized],
  )

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}
