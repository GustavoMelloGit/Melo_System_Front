import { ChakraProvider } from '@chakra-ui/react'
import { useForm, type FieldValues, type UseFormRegister } from 'react-hook-form'
import RHFField from '.'

type ContextType = {
  register: UseFormRegister<FieldValues>
  name: string
}

export default {
  title: 'RHFField',
  component: RHFField,
  decorators: [
    (Story: any) => {
      const { register } = useForm()
      return (
        <ChakraProvider>
          <Story register={register} />
        </ChakraProvider>
      )
    },
  ],
}

export const Default = (_: any, { register, name }: ContextType): JSX.Element => {
  return <RHFField register={register} name={name} />
}

export const WithLabel = (_: any, { register, name }: ContextType): JSX.Element => (
  <RHFField register={register} name={name} label='Label' />
)
