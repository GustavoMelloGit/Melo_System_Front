import { ListItem, useColorModeValue } from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom'

type SidebarListItemProps = {
  to: string
  label: string
  icon?: JSX.Element
}
export default function SidebarListItem({ to, label, icon }: SidebarListItemProps): JSX.Element {
  const isActive = useLocation().pathname === to
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
      >
        {icon}
        {label}
      </ListItem>
    </Link>
  )
}
