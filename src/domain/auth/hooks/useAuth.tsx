import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { AuthContextType } from '../types/context/auth'

export default function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
  return context
}
