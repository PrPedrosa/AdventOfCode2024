import { getDataFromTextFile } from "../getDataFromTextFile.js"

const dataArr = getDataFromTextFile(13).split("\n").filter(Boolean)

const dataObjArr = []
let machineIdx = 0

// transform data string into neat object
dataArr.forEach(line => {
  if (line.startsWith("Button A")) {
    dataObjArr.push({
      A: {
        X: Number(line.slice(line.indexOf("+") + 1, line.indexOf(","))),
        Y: Number(line.slice(line.lastIndexOf("+") + 1)),
      },
    })
    return
  }

  if (line.startsWith("Button B")) {
    dataObjArr[machineIdx] = {
      ...dataObjArr[machineIdx],
      B: {
        X: Number(line.slice(line.indexOf("+") + 1, line.indexOf(","))),
        Y: Number(line.slice(line.lastIndexOf("+") + 1)),
      },
    }
    return
  }

  dataObjArr[machineIdx] = {
    ...dataObjArr[machineIdx],
    prize: {
      X: Number(line.slice(line.indexOf("=") + 1, line.indexOf(","))),
      Y: Number(line.slice(line.lastIndexOf("=") + 1)),
    },
  }
  machineIdx++
})

// Will find num of A and B presses needed to get to the prize
const findPresses = machineObj => {
  const numAX = machineObj.A.X
  const numAY = machineObj.A.Y
  const numBX = machineObj.B.X
  const numBY = machineObj.B.Y
  const prizeX = machineObj.prize.X
  const prizeY = machineObj.prize.Y

  // normalize coefficients for A to eliminate it
  const normalizedNumBX = numAY * numBX
  const normalizedNumBY = numAX * numBY
  const normalizedPrizeX = numAY * prizeX
  const normalizedPrizeY = numAX * prizeY

  // Subtract Y's equation from X's equation
  const subtractedPrize = normalizedPrizeY - normalizedPrizeX
  const subtractedB = normalizedNumBY - normalizedNumBX

  const numOfBPresses = subtractedPrize / subtractedB
  const numOfAPresses = (prizeX - numBX * numOfBPresses) / numAX

  return [numOfAPresses, numOfBPresses]
}

// Puzzle 1
const pressesArr = dataObjArr.map(machineObj => findPresses(machineObj))
const tokensArr = pressesArr.map(([aPresses, bPresses]) => {
  // if decimals, no number of presses could get to the prize
  if (aPresses.toString().includes(".") || bPresses.toString().includes(".")) return null
  return aPresses * 3 + bPresses
})

const result = tokensArr.reduce((acc, val) => acc + (val ?? 0), 0)
console.log(result)

// Puzzle 2
// adding 10 000 000 000 000 to prize
const pressesArr2 = dataObjArr.map(machineObj => {
  return findPresses({
    ...machineObj,
    prize: { X: machineObj.prize.X + 10000000000000, Y: machineObj.prize.Y + 10000000000000 },
  })
})

const tokensArr2 = pressesArr2.map(([aPresses, bPresses]) => {
  // if decimals, no number of presses could get to the prize
  if (aPresses.toString().includes(".") || bPresses.toString().includes(".")) return null
  return aPresses * 3 + bPresses
})

const result2 = tokensArr2.reduce((acc, val) => acc + (val ?? 0), 0)
console.log(result2)
