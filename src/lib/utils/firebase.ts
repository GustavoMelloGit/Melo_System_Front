import { collection, CollectionReference, DocumentData, getDocs, query, QueryConstraint } from "firebase/firestore"
import useSWR from "swr"
import { UseSwrFirebase } from "../../shared/types/utils/firebase"
import { firestore } from "../config/firebase"


export async function firebaseQueryBuilder(
    collectionRef: CollectionReference<DocumentData>,
    ...queryConstraints: QueryConstraint[]
): Promise<DocumentData[]> {
    const q = query(collectionRef, ...queryConstraints)
    const querySnapshot = await getDocs(q)
    const data = querySnapshot.docs.map((doc) => doc.data())
    return data
}

export async function firebaseFetcher(collectionName: string, ...queryConstraints: QueryConstraint[]): Promise<DocumentData[]> {
    const collectionRef = collection(firestore, collectionName)
    const data = await firebaseQueryBuilder(collectionRef, ...queryConstraints)
    return data
}

export function useSwrFirebase<T>(collectionName: string, ...queryConstraints: QueryConstraint[]): UseSwrFirebase<T> {
    const { data, error } = useSWR<DocumentData[], Error>(
        collectionName,
        async () => firebaseFetcher(collectionName, ...queryConstraints)
    )

    console.log(error)
    return {
        data: data as T | undefined,
        isLoading: !error && !data,
        error,
    }
}