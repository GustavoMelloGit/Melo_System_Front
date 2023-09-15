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
  useColorModeValue,
  type FlexProps,
} from '@chakra-ui/react'
import { useEffect, type ReactNode } from 'react'
import { Controller, useForm } from 'react-hook-form'
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
  onSubmit: (values: UsersPermissionsFormValues) => Promise<void>
}
export default function UsersListView({ permissions, users, onSubmit }: Props): JSX.Element {
  const bottomBarColor = useColorModeValue('gray.700', 'gray.200')
  const {
    control,
    formState: { dirtyFields, isSubmitting, isSubmitted },
    handleSubmit,
    reset,
  } = useForm<UsersPermissionsFormValues>({
    defaultValues: parseUsersToFormValues(users),
  })

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
              <Button variant='link' size='sm' type='reset' color='white' fontWeight='light'>
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
    <Flex justify='space-between' align='center' {...wrapperProps}>
      <Text textTransform='capitalize'>{label}</Text>
      <Text fontWeight={700} textAlign='right'>
        {value}
      </Text>
    </Flex>
  )
}
