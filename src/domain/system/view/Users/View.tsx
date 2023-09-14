import { Container, Divider, Stack } from '@chakra-ui/react'
import IconButton from '../../../../shared/components/IconButton'
import HeaderBreadcrumbs from '../../../../shared/components/layout/Header/HeaderBreadcrumbs'
import Page from '../../../../shared/components/Page'
import { type PermissionModel } from '../../../auth/types/model/permission'
import { type UserModel } from '../../../auth/types/model/user'
import { type UsersPermissionsFormValues } from '../../components/Users/UsersList/types'
import UsersListView from '../../components/Users/UsersList/View'

type Props = {
  handleAddUser: () => void
  users: UserModel[]
  permissions: PermissionModel[]
  handleUpdateUsersPermissions: (values: UsersPermissionsFormValues) => Promise<void>
}
export default function UsersView({
  handleAddUser,
  users,
  permissions,
  handleUpdateUsersPermissions,
}: Props): JSX.Element {
  return (
    <Page title='Usuários'>
      <Container maxW={500}>
        <HeaderBreadcrumbs
          heading='Usuários'
          links={[
            {
              label: 'Usuários do sistema',
            },
          ]}
          actions={
            <IconButton
              aria-label='Adicionar usuário'
              icon='add'
              colorScheme='blue'
              variant='outline'
              data-cy='add-users-button'
              title='Adicionar usuário'
              onClick={handleAddUser}
            />
          }
        />
        <Stack as='main' mt={10} divider={<Divider />} spacing={3}>
          {users.length > 0 && (
            <UsersListView
              permissions={permissions}
              users={users}
              onSubmit={handleUpdateUsersPermissions}
            />
          )}
        </Stack>
      </Container>
    </Page>
  )
}
