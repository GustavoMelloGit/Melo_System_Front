type ObjectKeyType = string | number | symbol

export type ExtendedRecord<T extends ObjectKeyType, K, J extends ObjectKeyType = string> = {
  [key in T]: K
} & Record<J, K>
