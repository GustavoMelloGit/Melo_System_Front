import { IconButton, type IconButtonProps } from '@chakra-ui/react'
import { useState, type MouseEvent } from 'react'
import { AiOutlinePrinter } from 'react-icons/ai'
import { BsCheckCircle, BsTrash } from 'react-icons/bs'
import { IoAddOutline } from 'react-icons/io5'
import { MdOutlineSell } from 'react-icons/md'
import { RiExchangeDollarLine } from 'react-icons/ri'
import { TbShoppingCart } from 'react-icons/tb'
import { isAsyncFunction } from '../../../types/utils/typeGuards'

const buttonIcons = {
  add: <IoAddOutline size={24} />,
  check: <BsCheckCircle size={20} />,
  remove: <BsTrash size={18} />,
  exchangeDollar: <RiExchangeDollarLine size={20} />,
  shopCart: <TbShoppingCart size={21} />,
  printer: <AiOutlinePrinter size={22} />,
  sell: <MdOutlineSell size={22} />,
}

type Props = Omit<IconButtonProps, 'icon'> & {
  icon: keyof typeof buttonIcons
}
export default function TableButton({ icon, onClick, ...props }: Props): JSX.Element {
  const [isLoading, setIsLoading] = useState(false)

  async function handleClick(e: MouseEvent<HTMLButtonElement>): Promise<void> {
    if (onClick) {
      if (isAsyncFunction(onClick)) {
        setIsLoading(true)
        await onClick(e)
        setIsLoading(false)
      } else {
        onClick(e)
      }
    }
  }

  return (
    <IconButton
      icon={buttonIcons[icon]}
      onClick={handleClick}
      isLoading={isLoading}
      variant='ghost'
      {...props}
    />
  )
}
