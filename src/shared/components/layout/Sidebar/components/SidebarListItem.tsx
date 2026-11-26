import { Center, ListItem, useColorModeValue } from '@chakra-ui/react'
import { type CSSProperties } from 'react'
import { Link } from 'react-router-dom'

type SidebarListItemProps = {
  label: string
  icon?: JSX.Element
  isActive?: boolean
} & ({ to: string; onClick?: never } | { onClick: () => void; to?: never })

const itemStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  width: '100%',
  height: '100%',
  padding: '.5rem 1rem',
}

export default function SidebarListItem({
  to,
  onClick,
  label,
  icon,
  isActive = false,
}: SidebarListItemProps): JSX.Element {
  const bg = useColorModeValue('gray.100', 'gray.700')

  const content = (
    <>
      <Center as='span' w={6}>
        {icon}
      </Center>
      {label}
    </>
  )

  return (
    <ListItem {...(isActive && { bg })} transition='background .3s' rounded={5} fontWeight={600}>
      {onClick ? (
        <Center
          as='button'
          type='button'
          onClick={onClick}
          justifyContent='flex-start'
          style={itemStyle}
        >
          {content}
        </Center>
      ) : (
        <Link to={to} style={itemStyle} draggable={false}>
          {content}
        </Link>
      )}
    </ListItem>
  )
}
