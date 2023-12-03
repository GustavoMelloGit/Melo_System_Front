type IProductNameParser = {
  addDescription: (name: string, description: string | undefined) => string
  removeDescription: (name: string) => string
}

export const ProductNameParser: IProductNameParser = {
  addDescription: (name: string, description: string | undefined) =>
    description ? `${name} (${description})` : name,
  removeDescription: (name: string) => {
    const regex = /\(([^)]+)\)/
    return name.replace(regex, '').trim()
  },
}
