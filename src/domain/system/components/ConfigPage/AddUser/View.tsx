import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Select,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import ControllerField from '../../../../../shared/components/inputs/ControllerField'
import { type AddUserFormValues } from './types'

const defaultValues: AddUserFormValues = {
  name: '',
  nickname: '',
  password: '',
  role: 'user',
}
type Props = {
  onSubmit: (values: AddUserFormValues) => Promise<void>
}
export default function AddUserView({ onSubmit }: Props): JSX.Element {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
  } = useForm<AddUserFormValues>({
    defaultValues,
  })

  return (
    <Accordion allowToggle>
      <AccordionItem border='none'>
        <AccordionButton px={0} justifyContent='space-between'>
          <Text fontWeight={700} fontSize='lg'>
            Adicionar usuário
          </Text>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>
          <form
            onSubmit={handleSubmit(async (values) => {
              await onSubmit(values)
              reset(defaultValues)
            })}
          >
            <Stack>
              <ControllerField
                control={control}
                name='name'
                label='Nome'
                placeholder='Ex.: Gustavo Mello'
              />
              <ControllerField
                control={control}
                name='nickname'
                label='Login'
                placeholder='Ex.: Gustavo'
              />
              <ControllerField
                control={control}
                name='password'
                label='Senha'
                placeholder='Utilize uma senha forte'
              />
              <ControllerField
                control={control}
                name='role'
                label='Permissão'
                CustomInput={
                  <Select>
                    <option value='user'>Usuário</option>
                    <option value='admin'>Admin</option>
                  </Select>
                }
              />
              <Button isLoading={isSubmitting} type='submit' colorScheme='blue'>
                Adicionar
              </Button>
            </Stack>
          </form>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
