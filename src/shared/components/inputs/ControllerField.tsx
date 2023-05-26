import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  type InputProps as ChakraInputProps,
} from '@chakra-ui/react'
import { cloneElement, type ReactNode } from 'react'
import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form'

type Props<TFormValues extends FieldValues, KInputProps = ChakraInputProps> = KInputProps & {
  control: Control<TFormValues>
  name: Path<TFormValues>
  label?: ReactNode
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  CustomInput?: JSX.Element
  required?: boolean
}
export default function ControllerField<
  TFormValues extends FieldValues,
  KInputProps = ChakraInputProps,
>({
  control,
  name,
  label,
  leftIcon,
  rightIcon,
  CustomInput,
  required,
  ...rest
}: Props<TFormValues, KInputProps>): JSX.Element {
  const commonInputProps = {
    fontWeight: 500,
    variant: 'filled',
    rounded: 'xl',
    isRequired: required,
    ...rest,
  }
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { invalid, error } }) => (
        <FormControl isInvalid={invalid}>
          {label && (
            <FormLabel>
              {label}
              {required && (
                <Text as='span' color='red.500' ml={1}>
                  *
                </Text>
              )}
            </FormLabel>
          )}
          <InputGroup>
            {leftIcon && <InputLeftElement>{leftIcon}</InputLeftElement>}
            {CustomInput ? (
              cloneElement(CustomInput, {
                ...commonInputProps,
                ...field,
              })
            ) : (
              <Input {...commonInputProps} {...field} />
            )}
            {rightIcon && <InputRightElement>{rightIcon}</InputRightElement>}
          </InputGroup>
          {error?.message && (
            <FormErrorMessage data-cy='validation-message'>{error.message}</FormErrorMessage>
          )}
        </FormControl>
      )}
    />
  )
}
