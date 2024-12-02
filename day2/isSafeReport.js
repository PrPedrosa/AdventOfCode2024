export const isSafeReport = reportNumbers => {
  let safeMaxDiff = true
  let isIncreasing = false
  let isDecreasing = false
  let equalNums = false

  reportNumbers.reduce((a, b) => {
    const numA = Number(a)
    const numB = Number(b)

    if (numA > numB) isDecreasing = true
    if (numA < numB) isIncreasing = true
    if (numA === numB) equalNums = true

    const diff = numA - numB
    if (diff > 3 || diff < -3) {
      safeMaxDiff = false
    }

    return b
  })

  if (!safeMaxDiff || equalNums || (isDecreasing && isIncreasing)) return false
  return true
}
