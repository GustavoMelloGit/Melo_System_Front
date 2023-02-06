import { Avatar, Center, type AvatarProps } from '@chakra-ui/react'
import Compressor from 'compressorjs'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { AiFillCamera } from 'react-icons/ai'

type AvatarDropzoneProps = Omit<AvatarProps, 'onDrop'> & {
  onDrop?: (image: string) => void
  currentSrc?: string
}
export default function AvatarDropzone({
  onDrop,
  currentSrc,
  ...rest
}: AvatarDropzoneProps): JSX.Element {
  const [currentImage, setCurrentImage] = useState(currentSrc)
  const handleOnDrop = useCallback((files: File[]) => {
    new Compressor(files[0], {
      quality: 0.6,
      width: 300,
      height: 300,
      success(result) {
        const reader = new FileReader()
        reader.onload = () => {
          if (reader.result) {
            const result = typeof reader.result === 'string' ? reader.result : ''
            setCurrentImage(result)
            onDrop?.(result)
          }
        }
        reader.readAsDataURL(result)
      },
      error(err) {
        console.log(err.message)
      },
    })
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
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
      src={currentImage}
      cursor='pointer'
      {...rest}
    >
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <Center
          pos='absolute'
          inset={0}
          opacity={isDragActive ? 1 : 0}
          bg='rgba(0,0,0,0.5)'
          h='full'
          rounded={'full'}
          zIndex={1}
          _hover={{
            opacity: 1,
          }}
          transition='opacity ease 0.2s'
        >
          <AiFillCamera size={28} color='white' />
        </Center>
      </div>
    </Avatar>
  )
}
