import SignInView from '../../../view/SignIn/View'
import MockAuthContextProvider from '../context/AuthContext'

export default function MockSignInView(): JSX.Element {
  return (
    <MockAuthContextProvider>
      <SignInView />
    </MockAuthContextProvider>
  )
}
