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
} as const
