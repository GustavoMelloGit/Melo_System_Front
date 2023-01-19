import { useSearchParams } from 'react-router-dom'

export default function useTablePagination(): UseTablePagination {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = parseInt(searchParams.get('page') ?? '1')

  const handleSetPage = (page: number): void => {
    setSearchParams({ page: page.toString() })
  }
  return { page, setPage: handleSetPage }
}

type UseTablePagination = {
  page: number
  setPage: (page: number) => void
}
