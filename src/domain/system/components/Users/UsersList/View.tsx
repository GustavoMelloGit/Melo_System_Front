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
import { useEffect, type ReactNode } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { deepCleanObject } from '../../../../../lib/utils/deepCleanObject'
import { isEmptyObject } from '../../../../../lib/utils/isEmptyObject'
import { type PermissionModel } from '../../../../auth/types/model/permission'
import { type UserModel, type UserRole } from '../../../../auth/types/model/user'
import { type UsersPermissionsFormValues } from './types'

const labelByRole: Record<UserRole, string> = {
  admin: 'Administrador',
  user: 'Usuário',
}

function parseUsersToFormValues(users: UserModel[]): UsersPermissionsFormValues {
  return users
    .filter((u) => u.role !== 'admin')
    .reduce<UsersPermissionsFormValues>((acc, curr) => {
      curr.permissions.forEach((permission) => {
        const currentRoute = acc[curr.id]
        if (currentRoute) {
          acc[curr.id][`${permission.method}%${permission.route}`] = true
        } else {
          acc[curr.id] = {
            [`${permission.method}%${permission.route}`]: true,
          }
        }
      })
      return acc
    }, {})
}

type Props = {
  users: UserModel[]
  permissions: PermissionModel[]
}
export default function UsersListView({ permissions, users }: Props): JSX.Element {
  const {
    control,
    formState: { dirtyFields },
    handleSubmit,
    reset,
  } = useForm<UsersPermissionsFormValues>()

  useEffect(() => {
    if (users.length > 0) {
      const formValues = parseUsersToFormValues(users)
      reset(formValues)
    }
  }, [users])

  return (
    <Accordion allowToggle>
      <form
        onSubmit={handleSubmit((values) => {
          console.log(deepCleanObject(values))
        })}
      >
        {users.map((user) => (
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
              {user.role !== 'admin' && (
                <>
                  <Flex my={2} align='center' gap={3}>
                    <Divider />
                    <Text fontSize='md'>Permissões</Text>
                    <Divider />
                  </Flex>
                  <Stack>
                    {permissions.map((permission) => (
                      <InfoBox
                        key={`${permission.route}-${permission.method}`}
                        label={permission.description}
                        value={
                          <Controller
                            control={control}
                            name={`${user.id}.${permission.method}%${permission.route}`}
                            render={({ field: { onChange, value, ...field } }) => {
                              return (
                                <Switch
                                  onChange={(e) => {
                                    const isChecked = e.target.checked
                                    onChange(isChecked)
                                  }}
                                  isChecked={value}
                                  {...field}
                                />
                              )
                            }}
                          />
                        }
                      />
                    ))}
                  </Stack>
                </>
              )}
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
