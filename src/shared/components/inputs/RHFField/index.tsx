import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  type InputGroupProps,
  type InputProps,
} from '@chakra-ui/react'
import {
  get,
  type FieldValues,
  type Path,
  type RegisterOptions,
  type UseFormRegister,
} from 'react-hook-form'

export type FormInputProps<TFormValues extends FieldValues> = {
  name: Path<TFormValues>
  rules?: RegisterOptions<TFormValues, Path<TFormValues>>
  register: UseFormRegister<TFormValues>
  errors?: unknown
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  label?: string
  inputGroupProps?: InputGroupProps
} & Omit<InputProps, 'name'>

const RHFField = <TFormValues extends Record<string, unknown>>({
  name,
  rules,
  register,
  errors,
  leftIcon,
  rightIcon,
  label,
  inputGroupProps,
  ...rest
}: FormInputProps<TFormValues>): JSX.Element => {
  const errorMessages = get(errors, name)
  const hasError = !!(errors && errorMessages)
  return (
    <FormControl isInvalid={hasError}>
      {label && <FormLabel>{label}</FormLabel>}
      <InputGroup {...inputGroupProps}>
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
      {errorMessages && (
        <FormErrorMessage data-cy='validation-message'>{errorMessages.message}</FormErrorMessage>
      )}
    </FormControl>
  )
}

export default RHFField
