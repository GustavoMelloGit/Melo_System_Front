import { IconButton, type IconButtonProps } from '@chakra-ui/react'
import { BiFilter } from 'react-icons/bi'

export default function TableFilterButton(props: IconButtonProps): JSX.Element {
  return <IconButton variant='ghost' icon={<BiFilter size={28} />} {...props} />
}
