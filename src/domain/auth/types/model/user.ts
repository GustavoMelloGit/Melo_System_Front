export type UserModel = {
  isAuthenticated: boolean
  email: string
  name: string
  role: 'admin' | 'user'
}
