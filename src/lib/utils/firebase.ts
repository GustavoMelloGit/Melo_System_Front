import { collection, DocumentData, getDocs } from "firebase/firestore"
import useSWR from "swr"
import { UseSwrFirebase } from "../../shared/types/utils/firebase"
import { firestore } from "../config/firebase"

export async function firebaseFetcher(collectionName: string): Promise<DocumentData[]> {
    const querySnapshot = await getDocs(collection(firestore, collectionName))
    const data = querySnapshot.docs.map((doc) => doc.data())
    return data
}

export function useSwrFirebase<T>(collectionName: string): UseSwrFirebase<T> {
    const { data, error } = useSWR<DocumentData[], Error>(collectionName, firebaseFetcher)
    return {
        data: data as T | undefined,
        isLoading: !error && !data,
        error,
    }
}