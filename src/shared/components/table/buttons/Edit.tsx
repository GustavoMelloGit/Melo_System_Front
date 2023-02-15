import { IconButton, type IconButtonProps } from '@chakra-ui/react'
import { TbPencil } from 'react-icons/tb'

export default function TableEditButton(props: IconButtonProps): JSX.Element {
  return <IconButton icon={<TbPencil size={20} />} variant='ghost' {...props} />
}
