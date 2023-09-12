import useUsersView from './useView'
import UsersView from './View'

export default function Users(): JSX.Element {
  const { users, handleAddUser, permissions } = useUsersView()

  return <UsersView handleAddUser={handleAddUser} users={users} permissions={permissions} />
}
