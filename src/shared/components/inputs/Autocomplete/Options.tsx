import { Button, Flex, useColorModeValue } from '@chakra-ui/react'
import { type Option } from './types'

type Props = {
  onSelect?: (option: Option) => void
  options: Option[]
  showOptions: boolean
}
export default function OptionsBox({ onSelect, options, showOptions }: Props): JSX.Element {
  const bgColor = useColorModeValue('gray.100', 'gray.700')
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
      borderWidth={2}
      borderColor='blue.500'
      py={1}
    >
      {options.map((option) => (
        <Button
          key={String(option.value)}
          data-value={option.value}
          variant='ghost'
          rounded={0}
          p={3}
          display='block'
          w='100%'
          h='fit-content'
          whiteSpace='nowrap'
          overflow='hidden'
          textOverflow='ellipsis'
          title={String(option.label)}
          textAlign='left'
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
