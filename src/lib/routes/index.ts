export const Routes = {
  notFound: '/404',
  home: '/home',
  login: '/login',
  clients: '/clients',
  clientPage: (uuid: string) => `/clients/${uuid}`,
  createClient: '/clients/create',
  updateClient: (uuid: string) => `/clients/update/${uuid}`,
  fertilizers: '/fertilizers',
  coffeePickups: '/coffee-pickups',
  books: '/books',
  bookPage: (number: string | number) => `/books/${number}`,
  createSheet: (bookNumber: string | number) => `/books/${bookNumber}/create`,
  updateSheet: (bookNumber: string | number, sheetNumber: string | number) =>
    `/books/${bookNumber}/update/${sheetNumber}`,
  sheetDetails: (bookNumber: string | number, sheetNumber: string | number) =>
    `/books/${bookNumber}/details/${sheetNumber}`,
} as const
