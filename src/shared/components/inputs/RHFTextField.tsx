import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Textarea,
  type TextareaProps,
} from '@chakra-ui/react'
import { get, type FieldValues, type Path, type UseFormRegister } from 'react-hook-form'

export type RHFTextFieldProps<TFormValues extends FieldValues> = {
  name: Path<TFormValues>
  register: UseFormRegister<TFormValues>
  errors?: unknown
  leftIcon?: React.ReactNode
  label?: string
} & Omit<TextareaProps, 'name'>

export default function RHFTextField<TFormValues extends Record<string, unknown>>({
  name,
  register,
  errors,
  leftIcon,
  label,
  ...rest
}: RHFTextFieldProps<TFormValues>): JSX.Element {
  const errorMessages = get(errors, name)
  const hasError = !!(errors && errorMessages)
  return (
    <FormControl isInvalid={hasError}>
      {label && <FormLabel>{label}</FormLabel>}
      <InputGroup>
        {leftIcon && <InputLeftElement pointerEvents='none'>{leftIcon}</InputLeftElement>}
        <Textarea variant='filled' rounded='xl' fontWeight={500} {...register(name)} {...rest} />
      </InputGroup>
      {errorMessages && <FormErrorMessage>{errorMessages.message}</FormErrorMessage>}
    </FormControl>
  )
}
