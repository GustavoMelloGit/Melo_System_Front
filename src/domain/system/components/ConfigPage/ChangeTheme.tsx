import { Flex, Select, Text, useColorMode } from '@chakra-ui/react'

export default function ChangeTheme(): JSX.Element {
  const { setColorMode, colorMode } = useColorMode()
  return (
    <Flex flexWrap='wrap' gap={2} w='full' justify='space-between' align='center'>
      <Text fontWeight={700} fontSize='lg'>
        Tema
      </Text>
      <Select
        w={40}
        onChange={(e) => {
          setColorMode(e.target.value)
        }}
        defaultValue={colorMode}
      >
        <option value='light'>Claro</option>
        <option value='dark'>Escuro</option>
      </Select>
    </Flex>
  )
}
