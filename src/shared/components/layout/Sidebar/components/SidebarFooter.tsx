import { Flex, Switch, useColorMode } from '@chakra-ui/react'
import { FiMoon, FiSun } from 'react-icons/fi'

export default function SidebarFooter(): JSX.Element {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Flex justify='center' as='footer' justifySelf='flex-end' pb={4}>
      <Flex gap={2} align='center'>
        <FiSun size={22} />
        <Switch onChange={toggleColorMode} isChecked={colorMode === 'dark'} />
        <FiMoon size={22} />
      </Flex>
    </Flex>
  )
}
