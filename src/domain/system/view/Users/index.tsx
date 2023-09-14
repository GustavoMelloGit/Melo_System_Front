import useUsersView from './useView'
import UsersView from './View'

export default function Users(): JSX.Element {
  const { users, handleAddUser, permissions, handleUpdateUsersPermissions } = useUsersView()

  return (
    <UsersView
      handleAddUser={handleAddUser}
      users={users}
      permissions={permissions}
      handleUpdateUsersPermissions={handleUpdateUsersPermissions}
    />
  )
}
