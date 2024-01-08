import {
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useNumberInput,
  type NumberInputProps,
} from '@chakra-ui/react'
import { forwardRef } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

type Props = NumberInputProps & {
  showControls?: boolean
}
const NumberInput = forwardRef<HTMLInputElement, Props>(
  ({ showControls = true, ...props }, ref): JSX.Element => {
    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps, htmlProps } =
      useNumberInput({
        ...props,
      })
    const inc = getIncrementButtonProps()
    const dec = getDecrementButtonProps()
    const input = getInputProps()

    return (
      <InputGroup w='full'>
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
        <Input ref={ref} {...htmlProps} {...input} />
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
    )
  },
)

export default NumberInput
