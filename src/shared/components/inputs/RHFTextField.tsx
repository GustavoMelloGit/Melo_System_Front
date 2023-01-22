import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Textarea,
  TextareaProps,
} from '@chakra-ui/react'
import {
  DeepMap,
  FieldError,
  FieldValues,
  get,
  Path,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form'

export type RHFTextFieldProps<TFormValues extends FieldValues> = {
  name: Path<TFormValues>
  rules?: RegisterOptions
  register: UseFormRegister<TFormValues>
  errors?: Partial<DeepMap<TFormValues, FieldError>>
  leftIcon?: React.ReactNode
  label?: string
} & Omit<TextareaProps, 'name'>

export default function RHFTextField<TFormValues extends Record<string, unknown>>({
  name,
  rules,
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
        <Textarea
          variant='filled'
          rounded='xl'
          fontWeight={500}
          {...register(name, rules)}
          {...rest}
        />
      </InputGroup>
      {errorMessages && <FormErrorMessage>{errorMessages.message}</FormErrorMessage>}
    </FormControl>
  )
}
