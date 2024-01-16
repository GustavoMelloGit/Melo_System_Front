import { Avatar, Flex, Stack, Text } from '@chakra-ui/react'
import { Routes } from '../../../lib/routes'
import Link from '../Link'
import Modal from '../Modal'
import { type BirthdayPerson } from './types'

type Props = {
  isOpen: boolean
  closeModalHandler: () => void
  birthdayPeople: BirthdayPerson[]
}
export default function BirthdayPopupView({
  closeModalHandler,
  isOpen,
  birthdayPeople,
}: Props): JSX.Element {
  return (
    <Modal isOpen={isOpen} onClose={closeModalHandler}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>
          <Modal.Title>Aniversariantes do Dia</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Stack>
            {birthdayPeople.map((person) => (
              <Flex key={person.id} gap={2} lineHeight={1} align='center'>
                <Avatar src={person.profileImage} name={person.name} />
                <Stack spacing={0.5}>
                  <Link to={Routes.clientPage(person.id)} onClickCapture={closeModalHandler}>
                    {person.name}
                  </Link>
                  {person.nickname && (
                    <Text fontSize='small' textColor='GrayText'>
                      ({person.nickname})
                    </Text>
                  )}
                </Stack>
              </Flex>
            ))}
          </Stack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  )
}
