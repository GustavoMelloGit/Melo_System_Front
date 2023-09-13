import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Center,
  Divider,
  Fade,
  Flex,
  Stack,
  Switch,
  Text,
} from '@chakra-ui/react'
import { type ReactNode } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { isEmptyObject } from '../../../../../lib/utils/isEmptyObject'
import { type PermissionModel } from '../../../../auth/types/model/permission'
import { type UserModel, type UserRole } from '../../../../auth/types/model/user'
import { type UsersPermissionsFormValues } from './types'

const labelByRole: Record<UserRole, string> = {
  admin: 'Administrador',
  user: 'Usuário',
}

// function parseUsersToFormValues(users: UserModel[]): UsersPermissionsFormValues {
//     return users.reduce((acc, curr) => {
//         acc[curr.id] = {
//             method
//         }
//         return acc
//     }, {})
// }

type Props = {
  users: UserModel[]
  permissions: PermissionModel[]
}
export default function UsersListView({ permissions, users }: Props): JSX.Element {
  console.log(users)
  const {
    control,
    formState: { dirtyFields },
    handleSubmit,
  } = useForm<UsersPermissionsFormValues>()

  return (
    <Accordion allowToggle>
      <form onSubmit={handleSubmit(console.log)}>
        {users.map((user, index) => (
          <AccordionItem key={user.id}>
            <AccordionButton>
              <Text as='span' fontSize='lg' textAlign='left' flex={1}>
                {user.name}
              </Text>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel fontSize='sm'>
              <InfoBox label='Nome' value={user.name} />
              <InfoBox label='Apelido' value={user.nickname} />
              <InfoBox label='Permissão' value={labelByRole[user.role]} />
              <InfoBox label='ID' value={user.id} />
              <Flex my={2} align='center' gap={3}>
                <Divider />
                <Text fontSize='md'>Permissões</Text>
                <Divider />
              </Flex>
              <Stack>
                {permissions.map((permission, index) => (
                  <InfoBox
                    key={`${permission.route}-${permission.method}`}
                    label={permission.description}
                    value={
                      <Controller
                        control={control}
                        name={`${user.id}.${index}.allowed`}
                        render={({ field: { onChange, value, ...field } }) => (
                          <Switch
                            onChange={(e) => {
                              const isChecked = e.target.checked
                              onChange(isChecked)
                            }}
                            checked={value}
                            {...field}
                          />
                        )}
                      />
                    }
                  />
                ))}
              </Stack>
            </AccordionPanel>
          </AccordionItem>
        ))}
        <Box pos='sticky' bottom={0} left={0} width='full' pb={8}>
          <Center
            as={Fade}
            in={isEmptyObject(dirtyFields)}
            bg={'rgba(26,32,44,0.7)'}
            backdropFilter='blur(4px)'
            rounded='xl'
            color='white'
            mt='4'
            gap={4}
            py={3}
            px={4}
            shadow='2xl'
            justifyContent='space-between'
          >
            <Text fontWeight='bold'>Deseja salvar as alterações?</Text>
            <Flex gap={4}>
              <Button variant='link' size='sm' type='reset' color='white' fontWeight='light'>
                Cancelar
              </Button>
              <Button type='submit' colorScheme='green' size='sm'>
                Salvar
              </Button>
            </Flex>
          </Center>
        </Box>
      </form>
    </Accordion>
  )
}
type InfoProps = {
  label: ReactNode
  value: ReactNode
}

function InfoBox({ label, value }: InfoProps): JSX.Element {
  return (
    <Flex justify='space-between' align='center'>
      <Text textTransform='capitalize'>{label}</Text>
      <Text fontWeight={700} textAlign='right'>
        {value}
      </Text>
    </Flex>
  )
}
