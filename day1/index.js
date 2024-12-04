import { getDataFromTextFile } from "../getDataFromTextFile.js"

const data = getDataFromTextFile(1)
const dataArr = data.split("\n")

// PUZZLE 1
const leftList = []
const rightList = []

for (let i = 0; i < dataArr.length; i++) {
  const nums = dataArr[i]
  const leftNum = Number(nums.split("   ")[0])
  const rightNum = Number(nums.split("   ")[1])
  leftList.push(leftNum)
  rightList.push(rightNum)
}

const sortedLeftList = leftList.toSorted((a, b) => a - b)
const sortedrightList = rightList.toSorted((a, b) => a - b)

let totalDistance = 0

for (let j = 0; j < sortedLeftList.length; j++) {
  const diff = sortedLeftList[j] - sortedrightList[j]
  if (diff < 0) totalDistance -= diff
  else totalDistance += diff
}
console.log("PUZZLE 1 answer is:", totalDistance)

// PUZZLE 2
let totalScore = 0

leftList.forEach(leftNum => {
  let repeated = 0
  rightList.forEach(rightNum => {
    if (rightNum === leftNum) repeated++
  })
  totalScore += leftNum * repeated
})

console.log("PUZZLE 2 answer is:", totalScore)
