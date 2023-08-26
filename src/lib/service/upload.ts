import { getDownloadURL, getStorage, ref, uploadString } from 'firebase/storage'
import { errorHandler } from '../utils/errorHandler'

const storage = getStorage()

export async function uploadImage(image: string, name: string): Promise<string> {
  try {
    const storageRef = ref(storage, name)
    const response = await uploadString(storageRef, image, 'data_url')
    const url = await getDownloadURL(response.ref)
    return url
  } catch (e) {
    return errorHandler(e)
  }
}
