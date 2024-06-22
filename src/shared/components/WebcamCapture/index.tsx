import {
  Box,
  BoxProps,
  ImageProps as CImageProps,
  Image as ChakraImage,
  IconButton,
  IconButtonProps,
} from '@chakra-ui/react'
import { createContext, forwardRef, useCallback, useContext, useMemo, useRef } from 'react'
import { MdCamera } from 'react-icons/md'
import { TiArrowSync } from 'react-icons/ti'
import Webcam, { WebcamProps } from 'react-webcam'

type Constraints = {
  width: number
  height: number
}

type WebcamContext = {
  webcamRef: React.RefObject<Webcam>
}

const webcamContext = createContext<WebcamContext | null>(null)

type RootProps = BoxProps
const Root = forwardRef<HTMLDivElement, RootProps>(({ children, ...rest }, ref): JSX.Element => {
  const webcamRef = useRef<Webcam>(null)

  const value: WebcamContext = useMemo(
    () => ({
      webcamRef,
    }),
    [],
  )

  return (
    <webcamContext.Provider value={value}>
      <Box pos='relative' overflow='hidden' {...rest} ref={ref}>
        {children}
      </Box>
    </webcamContext.Provider>
  )
})

const useWebcamContext = () => {
  const context = useContext(webcamContext)
  if (!context) throw new Error('Root component from WebcamCapture is missing')

  return context
}

type VideoProps = Partial<Omit<WebcamProps, 'audio' | 'screenshotFormat' | 'videoConstraints'>> & {
  constraints?: Constraints
}
const Video = forwardRef<Webcam, VideoProps>(({ constraints, style, ...rest }, ref) => {
  const { webcamRef } = useWebcamContext()
  const actualRef = ref ?? webcamRef

  return (
    <Webcam
      audio={false}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        ...style,
      }}
      forceScreenshotSourceSize
      screenshotFormat='image/webp'
      videoConstraints={{
        ...constraints,
        facingMode: 'user',
      }}
      {...rest}
      ref={actualRef}
    />
  )
})

const Capture = forwardRef<HTMLImageElement, CImageProps>((props, ref) => {
  return (
    <ChakraImage alt='client profile' w='full' h='full' objectFit='cover' {...props} ref={ref} />
  )
})

type ClearCaptureButtonProps = Omit<IconButtonProps, 'aria-label'> & {
  onClear: () => void
}

const ClearCaptureButton = forwardRef<HTMLButtonElement, ClearCaptureButtonProps>(
  ({ onClear, ...props }, ref) => {
    return (
      <IconButton
        aria-label='clear capture button'
        icon={<TiArrowSync size={28} />}
        onClick={onClear}
        pos='absolute'
        bottom={4}
        left='50%'
        transform='translateX(-50%)'
        colorScheme='blue'
        rounded='full'
        {...props}
        ref={ref}
      />
    )
  },
)

type CaptureButtonProps = {
  onCapture: (imageSrc: string) => void
}
const CaptureButton = forwardRef<HTMLButtonElement, CaptureButtonProps>(
  ({ onCapture, ...props }, ref) => {
    const { webcamRef } = useWebcamContext()

    const capture = useCallback(() => {
      if (!webcamRef || !webcamRef.current) return
      const imageSrc = webcamRef.current.getScreenshot()
      if (imageSrc) onCapture(imageSrc)
    }, [webcamRef])

    return (
      <IconButton
        aria-label='capture picture'
        icon={<MdCamera size={28} />}
        onClick={capture}
        pos='absolute'
        bottom={4}
        left='50%'
        transform='translateX(-50%)'
        colorScheme='blue'
        rounded='full'
        {...props}
        ref={ref}
      />
    )
  },
)

const WebcamCapture = {
  Root,
  Video,
  CaptureButton,
  Capture,
  ClearCaptureButton,
}
export default WebcamCapture
