import { ListItem, useColorModeValue } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

type SidebarListItemProps = {
  to: string
  label: string
  icon?: JSX.Element
  isActive?: boolean
}
export default function SidebarListItem({
  to,
  label,
  icon,
  isActive = false,
}: SidebarListItemProps): JSX.Element {
  const bg = useColorModeValue('gray.100', 'gray.700')

  return (
    <Link to={to}>
      <ListItem
        {...(isActive && { bg })}
        py={2}
        px={4}
        rounded={5}
        display='flex'
        alignItems={'center'}
        gap={2}
        fontWeight={600}
      >
        {icon}
        {label}
      </ListItem>
    </Link>
  )
}
