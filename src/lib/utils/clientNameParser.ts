type IClientNameParser = {
  addNickname: (name: string, nickname: string) => string
  removeNickname: (name: string) => string
  getNickname: (nameWithNickname: string) => string | null
}

export const ClientNameParser: IClientNameParser = {
  addNickname: (name: string, nickname: string) => `${name} (${nickname})`,
  removeNickname: (name: string) => name.split(' (')[0],
  getNickname: (nameWithNickname: string) => {
    const regex = /\(([^)]+)\)/
    const matches = regex.exec(nameWithNickname)
    if (matches && matches.length > 1) {
      return matches[1]
    } else {
      return null
    }
  },
}
