import { IconButton, type IconButtonProps } from '@chakra-ui/react'
import { BsCheckCircle } from 'react-icons/bs'

export default function TableCheckButton(props: IconButtonProps): JSX.Element {
  return (
    <IconButton
      icon={<BsCheckCircle size={20} />}
      variant='ghost'
      data-cy='table-edit-button'
      {...props}
    />
  )
}
