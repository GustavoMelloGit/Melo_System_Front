export function normalize(word: string): string {
  const wordWithoutUnnecessarySpaces = word.trim().replace(/\s+/g, ' ')
  const wordWithoutAccents = wordWithoutUnnecessarySpaces
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
  return wordWithoutAccents.toLowerCase()
}
