import GlobalConfig from '../../../../lib/constants/config'

/**
 * Function that returns the number of bags and weight in Kg
 * @param amount Amount in Kg
 * @param KgPerBag Kg per bag
 * @returns {[number, number]} Number of bags and weight in Kg
 * @example
 * getNumberOfBagsAndWeight(61, 60) // [1, 1]
 * getNumberOfBagsAndWeight(61, 61) // [1, 0]
 * getNumberOfBagsAndWeight(61, 62) // [0, 61]
 */
export const getNumberOfBagsAndWeight = (
  amount: number,
  KgPerBag: number = GlobalConfig.weightPerBag,
): [number, number] => {
  const absoluteAmount = Math.abs(amount)
  const numberOfBags = Math.floor(absoluteAmount / KgPerBag)
  if (numberOfBags === 0) return [0, absoluteAmount]
  const remainder = Math.round(((absoluteAmount % KgPerBag) + Number.EPSILON) * 100) / 100
  return [numberOfBags, remainder]
}

/**
 * Function that takes amount in Kg and the bags/Kg and returns the number of bags in a formatted string
 * @param absoluteAmount Amount in Kg
 * @param KgPerBag Kg per bag
 * @returns Number of bags
 * @example
 * getNumberOfBags(61, 60) // 1 Sc 1 Kg
 * getNumberOfBags(61, 61) // 1 Sc
 * getNumberOfBags(61, 62) // 61 Kg
 */
export const getNumberOfBags = (
  amount: number,
  KgPerBag: number = GlobalConfig.weightPerBag,
): string => {
  const [numberOfBags, remainder] = getNumberOfBagsAndWeight(amount, KgPerBag)
  if (numberOfBags === 0) return `${remainder} Kg`
  const numberOfBagsString = numberOfBags > 0 ? `${numberOfBags} Sc` : ``
  const remainderString = remainder > 0 ? `${remainder} Kg` : ''
  return `${amount < 0 ? '-' : ''}${numberOfBagsString} ${remainderString}`.trim()
}
