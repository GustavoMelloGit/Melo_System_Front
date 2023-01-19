import { DocumentData } from "firebase/firestore"

export type UseSwrFirebase = {
    data: DocumentData[] | undefined
    isLoading: boolean
    error: Error | undefined
}