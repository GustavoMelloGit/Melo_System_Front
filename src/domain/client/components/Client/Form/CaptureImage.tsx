import { Flex } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import WebcamCapture from '../../../../../shared/components/WebcamCapture/index'
import { ClientFormValues } from './types'

export default function CaptureImage(): JSX.Element {
  const { setValue, watch } = useFormContext<ClientFormValues>()
  const profileImage = watch('profileImage')
  console.log(profileImage ? 'hidden' : 'block')

  function updateProfileImage(value: string | undefined) {
    setValue('profileImage', value)
  }

  return (
    <Flex justify='center'>
      <WebcamCapture.Root boxSize={240} rounded='full'>
        {profileImage && (
          <>
            <WebcamCapture.ClearCaptureButton
              right={8}
              top={8}
              onClear={() => {
                updateProfileImage(undefined)
              }}
            />
            <WebcamCapture.Capture src={profileImage} />
          </>
        )}
        <WebcamCapture.Video />
        <WebcamCapture.CaptureButton onCapture={updateProfileImage} />
      </WebcamCapture.Root>
    </Flex>
  )
}
