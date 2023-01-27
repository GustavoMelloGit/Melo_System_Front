import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  type InputProps,
  InputRightElement,
} from '@chakra-ui/react'
import {
  type DeepMap,
  type FieldError,
  type FieldValues,
  get,
  type Path,
  type RegisterOptions,
  type UseFormRegister,
} from 'react-hook-form'

export type FormInputProps<TFormValues extends FieldValues> = {
  name: Path<TFormValues>
  rules?: RegisterOptions
  register: UseFormRegister<TFormValues>
  errors?: Partial<DeepMap<TFormValues, FieldError>>
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  label?: string
} & Omit<InputProps, 'name'>

const RHFField = <TFormValues extends Record<string, unknown>>({
  name,
  rules,
  register,
  errors,
  leftIcon,
  rightIcon,
  label,
  ...rest
}: FormInputProps<TFormValues>): JSX.Element => {
  const errorMessages = get(errors, name)
  const hasError = !!(errors && errorMessages)
  return (
    <FormControl isInvalid={hasError}>
      {label && <FormLabel>{label}</FormLabel>}
      <InputGroup>
        {leftIcon && <InputLeftElement>{leftIcon}</InputLeftElement>}
        <Input
          variant='filled'
          rounded='xl'
          fontWeight={500}
          {...register(name, rules)}
          {...rest}
        />
        {rightIcon && <InputRightElement>{rightIcon}</InputRightElement>}
      </InputGroup>
      {errorMessages && <FormErrorMessage>{errorMessages.message}</FormErrorMessage>}
    </FormControl>
  )
}

export default RHFField
