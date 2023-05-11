export const DEFAULT_PAGINATION_LIMIT = 10
export const DEFAULT_ROWS_PER_PAGE_OPTIONS = [5, 10, 25, 50]
export const PaginationParams = {
  page: 'page',
  rowsPerPage: 'limit',
  sortBy: 'orderBy',
  sortOrder: 'orderDirection',
  searchFor: 'searchFor',
  searchBy: 'query',
} as const

export const DEFAULT_ROWS_PER_PAGE = DEFAULT_ROWS_PER_PAGE_OPTIONS[1]
