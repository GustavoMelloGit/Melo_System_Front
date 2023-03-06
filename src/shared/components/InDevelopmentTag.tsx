import { Center, Tag, TagLeftIcon } from '@chakra-ui/react'
import { IoWarningOutline } from 'react-icons/io5'

export default function InDevelopmentTag(): JSX.Element {
  return (
    <Center>
      <Tag colorScheme='yellow'>
        <TagLeftIcon>
          <IoWarningOutline size={26} />
        </TagLeftIcon>
        Em desenvolvimento
      </Tag>
    </Center>
  )
}
