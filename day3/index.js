import { getDataFromTextFile } from "../getDataFromTextFile.js"

const data = getDataFromTextFile(3)

const getResultFromString = relevantString => {
  // Matches patterns of "mul(x,y)" where x and y have to be numbers with 1-3 digits
  const findMultiplicationsRegex = /mul\(\d{1,3},\d{1,3}\)/g

  const multiplications = relevantString.match(findMultiplicationsRegex)

  return multiplications.reduce((acc, val) => {
    // Regex to take out all unecessary chars, leaving just the numbers separated by ","
    const rgx = /[()mul]/g
    const nums = val.replace(rgx, "").split(",")
    return acc + Number(nums[0]) * Number(nums[1])
  }, 0)
}

// PUZZLE 1
const resultPuzzle1 = getResultFromString(data)
console.log(resultPuzzle1)

// PUZZLE 2
const arr = data.split("don't()")

let relevantString = arr.splice(0, 1).join("")

arr.forEach(string => {
  if (!string.includes("do()")) return
  const doIdx = string.indexOf("do()")
  relevantString = `${relevantString}${string.slice(doIdx)}`
})

const resultPuzzle2 = getResultFromString(relevantString)

console.log(resultPuzzle2)
