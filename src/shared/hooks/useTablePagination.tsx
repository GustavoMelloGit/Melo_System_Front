import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { DEFAULT_ROWS_PER_PAGE } from '../../lib/constants/pagination'

export default function useTablePagination(): UseTablePagination {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = parseInt(searchParams.get('page') ?? '1')
  const rowsPerPage = parseInt(searchParams.get('rowsPerPage') ?? DEFAULT_ROWS_PER_PAGE.toString())

  const allSearchParams = useMemo(
    () =>
      Array.from(searchParams.keys()).reduce(
        (acc, val) => ({ ...acc, [val]: searchParams.get(val) }),
        {},
      ),
    [searchParams],
  )

  function handleSetPage(page: number): void {
    setSearchParams({
      ...allSearchParams,
      page: page.toString(),
    })
  }

  function handleSetRowsPerPage(rowsPerPage: number): void {
    setSearchParams({
      ...allSearchParams,
      rowsPerPage: rowsPerPage.toString(),
    })
  }

  return { page, setPage: handleSetPage, rowsPerPage, setRowsPerPage: handleSetRowsPerPage }
}

type UseTablePagination = {
  page: number
  setPage: (page: number) => void
  rowsPerPage: number
  setRowsPerPage: (rowsPerPage: number) => void
}
