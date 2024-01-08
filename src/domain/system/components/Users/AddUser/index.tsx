import useAddUser from './useView'
import AddUserView from './View'

export default function AddUser(): JSX.Element {
  const { handleAddUser } = useAddUser()
  return <AddUserView onSubmit={handleAddUser} />
}
