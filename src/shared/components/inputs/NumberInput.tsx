import {
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  useNumberInput,
  type NumberInputProps,
} from '@chakra-ui/react'
import { forwardRef } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

type Props = NumberInputProps & {
  showControls?: boolean
  label?: string
  placeholder?: string
}
const NumberInput = forwardRef<HTMLInputElement, Props>(
  ({ showControls = true, label, ...props }, ref): JSX.Element => {
    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps, htmlProps } =
      useNumberInput({
        ...props,
      })
    const inc = getIncrementButtonProps()
    const dec = getDecrementButtonProps()
    const input = getInputProps()

    return (
      <FormControl w='full'>
        {label && (
          <FormLabel>
            {label}{' '}
            {props.isRequired && (
              <Text as='span' color='red.500' ml={1}>
                *
              </Text>
            )}
          </FormLabel>
        )}
        <InputGroup>
          {showControls && (
            <InputLeftElement>
              <IconButton
                aria-label='Decrement value'
                icon={<AiOutlineMinus />}
                roundedLeft={props.rounded}
                roundedRight={0}
                {...dec}
              />
            </InputLeftElement>
          )}
          <Input ref={ref} textAlign='center' {...htmlProps} {...input} />
          {showControls && (
            <InputRightElement>
              <IconButton
                aria-label='Increment value'
                icon={<AiOutlinePlus />}
                roundedRight={props.rounded}
                roundedLeft={0}
                {...inc}
              />
            </InputRightElement>
          )}
        </InputGroup>
      </FormControl>
    )
  },
)

export default NumberInput
