import {
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useNumberInput,
  type NumberInputProps,
} from '@chakra-ui/react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

type Props = NumberInputProps
export default function NumberInput(props: Props): JSX.Element {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
    ...props,
  })

  const inc = getIncrementButtonProps()
  const dec = getDecrementButtonProps()
  const input = getInputProps()

  const rounded = 'xl'

  return (
    <InputGroup w='full'>
      <InputLeftElement>
        <IconButton
          aria-label='Decrement value'
          icon={<AiOutlineMinus />}
          roundedLeft={rounded}
          roundedRight={0}
          {...dec}
        />
      </InputLeftElement>
      <Input variant='filled' textAlign='center' rounded={rounded} {...input} />
      <InputRightElement>
        <IconButton
          aria-label='Increment value'
          icon={<AiOutlinePlus />}
          roundedRight={rounded}
          roundedLeft={0}
          {...inc}
        />
      </InputRightElement>
    </InputGroup>
  )
}
