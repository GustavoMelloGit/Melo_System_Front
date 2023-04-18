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
    <ListItem {...(isActive && { bg })} rounded={5} fontWeight={600}>
      <Link
        to={to}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          width: '100%',
          height: '100%',
          padding: '.5rem 1rem',
        }}
        draggable={false}
      >
        {icon}
        {label}
      </Link>
    </ListItem>
  )
}
