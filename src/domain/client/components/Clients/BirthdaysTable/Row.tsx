import { Avatar, Td } from '@chakra-ui/react'
import { Routes } from '../../../../../lib/routes'
import LinkRow from '../../../../../shared/components/table/LinkRow'

type Client = {
  birthday: string
  name: string
  nickname: string | undefined
  photo: string | undefined
  id: string
}
type Props = {
  client: Client
}
export default function BirthdaysTableRow({ client }: Props): JSX.Element {
  return (
    <LinkRow
      to={Routes.clientPage(client.id)}
      descriptiveLinkText={`Ir para a conta do cliente ${client.name}`}
    >
      <Td>
        <Avatar loading='lazy' src={client.photo} name={client.name} />
      </Td>
      <Td>{client.name}</Td>
      <Td>{client.nickname}</Td>
      <Td>{client.birthday}</Td>
    </LinkRow>
  )
}
