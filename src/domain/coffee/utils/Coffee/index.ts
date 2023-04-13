/**
 * Function that takes amount in Kg and the bags/Kg and returns the number of bags in a formatted string
 * @param amount Amount in Kg
 * @param KgPerBag Kg per bag
 * @returns Number of bags
 * @example
 * getNumberOfBags(61, 60) // 1 Sc 1 Kg
 * getNumberOfBags(61, 61) // 1 Sc
 * getNumberOfBags(61, 62) // 61 Kg
 */
export const getNumberOfBags = (amount: number, KgPerBag: number = 61): string => {
  const numberOfBags = Math.floor(amount / KgPerBag)
  if (numberOfBags === 0) return `${amount} Kg`
  const remainder = Math.round(((amount % KgPerBag) + Number.EPSILON) * 100) / 100
  const numberOfBagsString = numberOfBags > 0 ? `${numberOfBags} Sc` : ''
  const remainderString = remainder > 0 ? `${remainder} Kg` : ''
  return `${numberOfBagsString} ${remainderString}`.trim()
}
