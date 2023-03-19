import BookForm from '../../../components/Book/Form'
import useCreateBookView from './useView'

type Props = {
  refetch: () => void
}
export default function CreateBookView({ refetch }: Props): JSX.Element {
  const { handleCreateBook } = useCreateBookView({ refetch })
  return (
    <BookForm
      onSubmit={handleCreateBook}
      initialValues={{
        number: 12, // TODO: get last number from API
      }}
    />
  )
}
