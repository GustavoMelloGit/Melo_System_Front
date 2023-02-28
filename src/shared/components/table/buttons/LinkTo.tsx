import { IconButton, type IconButtonProps } from '@chakra-ui/react'
import { HiArrowTopRightOnSquare } from 'react-icons/hi2'

export default function TableLinkToButton(props: IconButtonProps): JSX.Element {
  return (
    <IconButton
      as='span'
      icon={<HiArrowTopRightOnSquare size={20} />}
      variant='ghost'
      data-cy='table-linkTo-button'
      {...props}
    />
  )
}
