import { IconButton, type IconButtonProps } from '@chakra-ui/react'
import { IoAddOutline } from 'react-icons/io5'

export default function TableAddButton(props: IconButtonProps): JSX.Element {
  return <IconButton icon={<IoAddOutline size={22} />} variant='ghost' {...props} />
}
