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
  FormControl,
  FormLabel,
  Stack,
  Switch,
  Text,
  useColorModeValue,
  type FlexProps,
} from '@chakra-ui/react'
import { useEffect, type ReactNode } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { isEmptyObject } from '../../../../../lib/utils/isEmptyObject'
import { useModal } from '../../../../../shared/hooks/useModal'
import useAuth from '../../../../auth/hooks/useAuth'
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
  onSubmit: (values: UsersPermissionsFormValues) => Promise<void>
}
export default function UsersListView({ permissions, users, onSubmit }: Props): JSX.Element {
  const defaultValues = parseUsersToFormValues(users)
  const bottomBarColor = useColorModeValue('gray.700', 'gray.200')
  const {
    control,
    formState: { dirtyFields, isSubmitting, isSubmitted },
    handleSubmit,
    reset,
  } = useForm<UsersPermissionsFormValues>({
    defaultValues,
  })
  const { user: loggedUser } = useAuth()
  const openModal = useModal((state) => state.openModal)
  const isLoggedUserAdmin = loggedUser.role === 'admin'

  function resetHandler(): void {
    reset(defaultValues)
  }

  async function onDeleteUser(id: string): Promise<void> {
    const DeleteUserView = (await import('../DeleteUser/View')).default
    openModal(<DeleteUserView id={id} />)
  }

  async function onChangePassword(id: string): Promise<void> {
    const ChangePasswordView = (await import('../ChangePassword/View')).default
    openModal(<ChangePasswordView id={id} />)
  }

  useEffect(() => {
    if (isSubmitted) {
      reset()
    }
  }, [reset, isSubmitted])

  return (
    <Accordion allowToggle>
      <form onSubmit={handleSubmit(onSubmit)}>
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
              {isLoggedUserAdmin && (
                <Flex gap={3} mt={3}>
                  {loggedUser.id !== user.id && (
                    <Button
                      colorScheme='red'
                      size='sm'
                      flex={1}
                      onClick={async () => {
                        await onDeleteUser(user.id)
                      }}
                    >
                      Remover usuário
                    </Button>
                  )}
                  <Button
                    onClick={async () => onChangePassword(user.id)}
                    colorScheme='blue'
                    size='sm'
                    flex={1}
                  >
                    Alterar senha
                  </Button>
                </Flex>
              )}
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
                        wrapperProps={{
                          pos: 'relative',
                          _hover: {
                            _after: {
                              content: '""',
                              position: 'absolute',
                              bottom: -1,
                              left: 0,
                              width: '100%',
                              height: '1px',
                              background: bottomBarColor,
                              zIndex: 1,
                            },
                          },
                        }}
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
              <Button
                variant='link'
                size='sm'
                onClick={resetHandler}
                type='reset'
                color='white'
                fontWeight='light'
              >
                Cancelar
              </Button>
              <Button isLoading={isSubmitting} type='submit' colorScheme='green' size='sm'>
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
  wrapperProps?: FlexProps
}

function InfoBox({ label, value, wrapperProps }: InfoProps): JSX.Element {
  return (
    <FormControl as={Flex} justifyContent='space-between' alignItems='center' {...wrapperProps}>
      <FormLabel textTransform='capitalize' mb={0} mr={0}>
        {label}
      </FormLabel>
      <Text fontWeight={700} textAlign='right'>
        {value}
      </Text>
    </FormControl>
  )
}
