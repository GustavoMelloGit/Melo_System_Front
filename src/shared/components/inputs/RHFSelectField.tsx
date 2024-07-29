import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Select,
  type SelectProps,
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

export type RHFSelectFieldProps<TFormValues extends FieldValues> = {
  name: Path<TFormValues>
  rules?: RegisterOptions
  register: UseFormRegister<TFormValues>
  errors?: Partial<DeepMap<TFormValues, FieldError>>
  leftIcon?: React.ReactNode
  label?: string
  options: Array<{
    value: string
    label: string
  }>
} & Omit<SelectProps, 'name'>

export default function RHFSelectField<TFormValues extends Record<string, unknown>>({
  name,
  register,
  errors,
  leftIcon,
  label,
  options,
  ...rest
}: RHFSelectFieldProps<TFormValues>): JSX.Element {
  const errorMessages = get(errors, name)
  const hasError = !!(errors && errorMessages)
  return (
    <FormControl isInvalid={hasError}>
      {label && <FormLabel>{label}</FormLabel>}
      <InputGroup>
        {leftIcon && <InputLeftElement pointerEvents='none'>{leftIcon}</InputLeftElement>}
        <Select variant='filled' rounded='xl' fontWeight={500} {...register(name)} {...rest}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </InputGroup>
      {errorMessages && <FormErrorMessage>{errorMessages.message}</FormErrorMessage>}
    </FormControl>
  )
}
