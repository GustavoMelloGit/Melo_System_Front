import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
} from '@chakra-ui/react'
import { useState } from 'react'
import {
  DeepMap,
  FieldError,
  FieldValues,
  get,
  Path,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

export type FormInputProps<TFormValues extends FieldValues> = {
  name: Path<TFormValues>
  rules?: RegisterOptions
  register: UseFormRegister<TFormValues>
  errors?: Partial<DeepMap<TFormValues, FieldError>>
  label?: string
} & Omit<InputProps, 'name'>

const RHFPasswordField = <TFormValues extends Record<string, unknown>>({
  name,
  rules,
  register,
  errors,
  label,
  ...rest
}: FormInputProps<TFormValues>): JSX.Element => {
  const [isVisible, setIsVisible] = useState(false)
  const errorMessages = get(errors, name)
  const hasError = !!(errors && errorMessages)

  const handleTogglePasswordVisibility = (): void => {
    setIsVisible((prev) => !prev)
  }

  return (
    <FormControl isInvalid={hasError}>
      {label && <FormLabel>{label}</FormLabel>}
      <InputGroup>
        <Input
          variant='filled'
          rounded='xl'
          type={isVisible ? 'text' : 'password'}
          fontWeight={500}
          {...register(name, rules)}
          {...rest}
        />
        <InputRightElement>
          {isVisible ? (
            <IconButton
              variant='transparent'
              onClick={handleTogglePasswordVisibility}
              icon={<AiFillEyeInvisible aria-label='hide password' size={25} />}
              aria-label='hide password'
            />
          ) : (
            <IconButton
              variant='transparent'
              onClick={handleTogglePasswordVisibility}
              icon={<AiFillEye aria-label='show password' size={25} />}
              aria-label='show password'
            />
          )}
        </InputRightElement>
      </InputGroup>
      {errorMessages && <FormErrorMessage>{errorMessages.message}</FormErrorMessage>}
    </FormControl>
  )
}

export default RHFPasswordField
