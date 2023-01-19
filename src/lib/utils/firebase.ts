import {
  collection,
  CollectionReference,
  DocumentData,
  endBefore,
  getDocs,
  limit,
  query,
  QueryConstraint,
  QueryDocumentSnapshot,
  startAfter,
} from 'firebase/firestore'
import useSWR, { SWRResponse } from 'swr'
import { firestore } from '../config/firebase'

type TestDoc = {
  data: DocumentData[]
  lastDoc: QueryDocumentSnapshot<DocumentData> | undefined
  firstDoc: QueryDocumentSnapshot<DocumentData> | undefined
}

export async function firebaseQueryBuilder(
  collectionRef: CollectionReference<DocumentData>,
  ...queryConstraints: QueryConstraint[]
): Promise<TestDoc> {
  const q = query(collectionRef, ...queryConstraints)
  const querySnapshot = await getDocs(q)
  const firstDoc = querySnapshot.docs[0]
  const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1]
  const data = querySnapshot.docs.map((doc) => doc.data())

  return {
    data,
    lastDoc,
    firstDoc,
  }
}

export async function firebaseFetcher(
  collectionName: string,
  ...queryConstraints: QueryConstraint[]
): Promise<TestDoc> {
  const collectionRef = collection(firestore, collectionName)
  const data = await firebaseQueryBuilder(collectionRef, ...queryConstraints)
  return data
}

export function useSwrFirebase<T>(
  collectionName: string,
  ...queryConstraints: QueryConstraint[]
): Partial<SWRResponse> {
  const { data, error, isLoading } = useSWR<TestDoc, Error>(collectionName, async () =>
    firebaseFetcher(collectionName, ...queryConstraints),
  )

  return {
    data: data?.data as T | undefined,
    isLoading,
    error,
  }
}

type UseSwrFirebasePaginated = Partial<SWRResponse> & {
  fetchNextPage: () => Promise<void>
  fetchPreviousPage: () => Promise<void>
  changeRowsPerPage: (rowsPerPage: number) => Promise<void>
}
export function useSwrFirebasePaginated<T>(
  collectionName: string,
  rowsPerPage: number,
  ...queryConstraints: QueryConstraint[]
): UseSwrFirebasePaginated {
  const { data, error, mutate, isLoading } = useSWR<TestDoc, Error>(
    collectionName,
    async () => firebaseFetcher(collectionName, ...queryConstraints, limit(rowsPerPage)),
    { revalidateIfStale: false, revalidateOnFocus: false },
  )

  async function fetchNextPage(): Promise<void> {
    if (data?.lastDoc) {
      await mutate(
        firebaseFetcher(
          collectionName,
          ...queryConstraints,
          startAfter(data.lastDoc),
          limit(rowsPerPage),
        ),
        false,
      )
    }
  }

  async function fetchPreviousPage(): Promise<void> {
    if (data?.firstDoc) {
      await mutate(
        firebaseFetcher(
          collectionName,
          ...queryConstraints,
          endBefore(data.firstDoc),
          limit(rowsPerPage),
        ),
        false,
      )
    }
  }

  async function changeRowsPerPage(rowsPerPage: number): Promise<void> {
    await mutate(firebaseFetcher(collectionName, ...queryConstraints, limit(rowsPerPage)), false)
  }

  return {
    data: data?.data as T | undefined,
    isLoading,
    error,
    fetchNextPage,
    fetchPreviousPage,
    changeRowsPerPage,
  }
}
