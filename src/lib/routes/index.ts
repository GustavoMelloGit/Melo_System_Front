export const Routes = {
  notFound: '/404',
  home: '/home',
  login: '/login',
  clients: '/clients',
  createClient: '/clients/create',
  updateClient: (uuid: string) => `/clients/update/${uuid}`,
} as const
