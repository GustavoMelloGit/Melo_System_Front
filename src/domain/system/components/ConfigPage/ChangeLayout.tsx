import { Flex, Select, Text } from '@chakra-ui/react'
import { type LayoutSizes } from '../../../../shared/contexts/LayoutContext/types'
import useLayoutContext from '../../../../shared/hooks/useLayoutContext'

export default function ChangeLayout(): JSX.Element {
  const {
    layout: { setSize, size },
  } = useLayoutContext()

  function handleSetSize(size: LayoutSizes): void {
    setSize(size)
  }

  const layoutOptions: Record<LayoutSizes, string> = {
    md: 'Pequeno',
    lg: 'Médio',
    xl: 'Grande',
  }

  return (
    <Flex w='full' justify='space-between' align='center'>
      <Text fontWeight={700} fontSize='lg'>
        Layout
      </Text>
      <Select
        w={40}
        onChange={(e) => {
          handleSetSize(e.target.value as LayoutSizes)
        }}
        defaultValue={size}
      >
        {Object.entries(layoutOptions).map(([size, label]) => (
          <option key={size} value={size}>
            {label}
          </option>
        ))}
      </Select>
    </Flex>
  )
}
