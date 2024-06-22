import { Box, IconButton } from '@chakra-ui/react'
import { useCallback, useRef } from 'react'
import { MdCamera } from 'react-icons/md'
import Webcam from 'react-webcam'

const videoSize = {
  width: 520,
  height: 520,
}
const videoConstraints = {
  width: videoSize.width,
  height: videoSize.height,
  facingMode: 'user',
}

type Props = {
  onCapture: (imageSrc: string) => void
}
export default function WebcamCapture({ onCapture }: Props): JSX.Element {
  const webcamRef = useRef<Webcam>(null)

  const capture = useCallback(() => {
    if (!webcamRef || !webcamRef.current) return
    const imageSrc = webcamRef.current.getScreenshot()
    if (imageSrc) onCapture(imageSrc)
  }, [webcamRef])

  return (
    <Box
      pos='relative'
      maxW={videoSize.width}
      maxH={videoSize.height}
      rounded='full'
      overflow='hidden'
    >
      <Webcam
        audio={false}
        height={videoSize.height}
        width={videoSize.width}
        screenshotFormat='image/jpeg'
        videoConstraints={videoConstraints}
        ref={webcamRef}
      />
      <IconButton
        aria-label='capture picture'
        icon={<MdCamera size={32} />}
        onClick={capture}
        pos='absolute'
        bottom={8}
        left='50%'
        transform='translateX(-50%)'
        colorScheme='blue'
      />
    </Box>
  )
}
