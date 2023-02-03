import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  type InputProps,
} from '@chakra-ui/react'
import {
  get,
  type DeepMap,
  type FieldError,
  type FieldValues,
  type Path,
  type RegisterOptions,
  type UseFormRegister,
} from 'react-hook-form'
import { IMaskInput } from 'react-imask'

export type RHFMaskInputProps<TFormValues extends FieldValues> = {
  name: Path<TFormValues>
  rules?: RegisterOptions
  register: UseFormRegister<TFormValues>
  errors?: Partial<DeepMap<TFormValues, FieldError>>
  leftIcon?: React.ReactNode
  label?: string
  mask?: any
  setValue?: (value: string) => void
} & Omit<InputProps, 'name'>

export default function RHFMaskInput<TFormValues extends Record<string, unknown>>({
  name,
  rules,
  register,
  errors,
  leftIcon,
  label,
  setValue,
  ...rest
}: RHFMaskInputProps<TFormValues>): JSX.Element {
  const errorMessages = get(errors, name)
  const hasError = !!(errors && errorMessages)
  return (
    <FormControl isInvalid={hasError}>
      {label && <FormLabel>{label}</FormLabel>}
      <InputGroup>
        {leftIcon && <InputLeftElement pointerEvents='none'>{leftIcon}</InputLeftElement>}
        <Input
          as={IMaskInput}
          variant='filled'
          rounded='xl'
          fontWeight={500}
          {...register(name, rules)}
          inputRef={register(name, rules).ref}
          onAccept={(value: string) => {
            setValue?.(value)
          }}
          {...rest}
        />
      </InputGroup>
      {errorMessages && <FormErrorMessage>{errorMessages.message}</FormErrorMessage>}
    </FormControl>
  )
}
