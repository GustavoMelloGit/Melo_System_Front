import { Avatar, Td } from '@chakra-ui/react'
import { Routes } from '../../../../../lib/routes'
import LinkRow from '../../../../../shared/components/table/LinkRow'

type Client = {
  birthday: string
  name: string
  nickname: string | undefined
  photo: string | undefined
  isBirthdayToday: boolean
  id: string
}
type Props = {
  client: Client
}
export default function BirthdaysTableRow({ client }: Props): JSX.Element {
  return (
    <LinkRow
      sx={{
        ...(client.isBirthdayToday && {
          borderColor: 'yellow.100',
          borderWidth: '1px',
          borderStyle: 'solid',
        }),
      }}
      id={client.isBirthdayToday ? 'birthday-today' : undefined}
    >
      <Td>
        <Avatar loading='lazy' src={client.photo} name={client.name} />
      </Td>
      <Td>
        <LinkRow.Link to={Routes.clientPage(client.id)}>{client.name}</LinkRow.Link>
      </Td>
      <Td>{client.nickname}</Td>
      <Td>{client.birthday}</Td>
    </LinkRow>
  )
}
