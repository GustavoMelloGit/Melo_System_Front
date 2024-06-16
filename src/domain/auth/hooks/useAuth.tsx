import { useContext } from 'react'
import { AuthContext, type AuthContextType } from '../context/AuthContext'

export default function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
  return context
}
