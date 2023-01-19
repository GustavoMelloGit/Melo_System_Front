import { collection, DocumentData, getDocs } from "firebase/firestore"
import useSWR from "swr"
import { UseSwrFirebase } from "../../shared/types/utils/firebase"
import { firestore } from "../config/firebase"

export async function firebaseFetcher(collectionName: string): Promise<DocumentData[]> {
    const querySnapshot = await getDocs(collection(firestore, collectionName))
    const data = querySnapshot.docs.map((doc) => doc.data())
    return data
}

export function useSwrFirebase(collectionName: string): UseSwrFirebase {
    const { data, error } = useSWR<DocumentData[], Error>(collectionName, firebaseFetcher)
    return {
        data,
        isLoading: !error && !data,
        error,
    }
}