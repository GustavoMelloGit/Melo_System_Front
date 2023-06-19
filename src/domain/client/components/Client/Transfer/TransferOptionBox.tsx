import { Box, List, ListItem, useColorModeValue } from '@chakra-ui/react'

type Props = {
  options: Record<string, string>
}
export default function TransferOptionBox({ options }: Props): JSX.Element {
  const borderColor = useColorModeValue('gray.400', 'gray.700')
  const bgColor = useColorModeValue('gray.100', 'rgba(255, 255, 255, 0.05)')

  return (
    <Box border={`1px solid`} borderColor={borderColor} rounded={8} p={4} bgColor={bgColor}>
      <List>
        {Object.entries(options).map(([key, value]) => (
          <ListItem key={key}>{value}</ListItem>
        ))}
      </List>
    </Box>
  )
}
