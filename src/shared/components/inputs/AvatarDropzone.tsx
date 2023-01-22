import { Avatar, AvatarProps, Button } from '@chakra-ui/react'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { AiFillCamera } from 'react-icons/ai'

type AvatarDropzoneProps = Omit<AvatarProps, 'onDrop'> & {
  onDrop?: (image: string) => void
}
export default function AvatarDropzone({ onDrop, ...rest }: AvatarDropzoneProps): JSX.Element {
  const [currentImage, setCurrentImage] = useState('')
  const handleOnDrop = useCallback((files: File[]) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.result) {
        const result = typeof reader.result === 'string' ? reader.result : ''
        setCurrentImage(result)
        onDrop?.(result)
      }
    }
    reader.readAsDataURL(files[0])
  }, [])
  const { open } = useDropzone({
    onDrop: handleOnDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
    },
  })
  return (
    <Avatar
      size='2xl'
      pos='relative'
      overflow={'hidden'}
      _hover={{
        '& .upload-avatar': {
          opacity: 1,
        },
      }}
      src={currentImage}
      {...rest}
    >
      <Button
        className='upload-avatar'
        pos='absolute'
        inset={0}
        opacity={0}
        bg='rgba(0,0,0,0.5)'
        onClick={open}
        h='full'
        rounded={'full'}
        zIndex={1}
        _hover={{
          opacity: 1,
        }}
      >
        <AiFillCamera size={28} color='white' />
      </Button>
    </Avatar>
  )
}
