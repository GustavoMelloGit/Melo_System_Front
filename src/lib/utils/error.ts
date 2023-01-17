import { FirebaseError } from "firebase/app"
import { firebaseErrors } from "../errors"
import { DEFAULT_FIREBASE_ERROR_MESSAGE } from "../errors/firebase"

export const errorHandler = (error: FirebaseError): string => {
    const { code } = error
    const errorMessage = firebaseErrors[code] || DEFAULT_FIREBASE_ERROR_MESSAGE
    return errorMessage
}