import { Button, Flex, useColorModeValue } from '@chakra-ui/react'
import { type Option } from './types'
import { useAutocompleteStore } from './useAutocomplete'

type Props = {
  options: Option[]
  onSelect?: (option: Option) => void
}
export default function OptionsBox({ options, onSelect }: Props): JSX.Element {
  const bgColor = useColorModeValue('gray.100', 'gray.700')
  const { showOptions } = useAutocompleteStore()

  function handleOnClick(option: Option): void {
    if (onSelect) onSelect(option)
  }

  return (
    <Flex
      position='absolute'
      top='100%'
      left={0}
      right={0}
      zIndex={1}
      display={showOptions ? 'flex' : 'none'}
      background={bgColor}
      flexDir='column'
      align='stretch'
      rounded='md'
      overflow='hidden'
      borderWidth={2}
      borderColor='blue.500'
    >
      {options.map((option) => (
        <Button
          key={String(option.value)}
          data-value={option.value}
          variant='ghost'
          p={0}
          rounded={0}
          onClick={() => {
            handleOnClick(option)
          }}
        >
          {option.label}
        </Button>
      ))}
    </Flex>
  )
}
