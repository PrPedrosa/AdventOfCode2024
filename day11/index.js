import { getDataFromTextFile } from "../getDataFromTextFile.js"

const dataArr = getDataFromTextFile(11).split(" ")

const testDataArr = "125".split(" ")

const blinkStones = stonesArr =>
  stonesArr
    .map(stone => {
      if (stone === "0") return "1"
      if (stone.length % 2 === 0) {
        const sliceIdx = stone.length / 2
        return [stone.slice(0, sliceIdx), Number(stone.slice(sliceIdx)).toString()]
      }
      return (Number(stone) * 2024).toString()
    })
    .flat(1)

// PUZZLE 1
const numOfBlinks = 25

let finalStones = dataArr
for (let i = 0; i < numOfBlinks; i++) {
  finalStones = blinkStones(finalStones)
}
console.log(finalStones.length)

// Puzzle 2
const cache = {}
const getStoneLength = (stone, iterations = 75) => {
  const key = `${stone}-${iterations}`

  if (key in cache) return cache[key]

  if (iterations === 0) {
    cache[key] = 1
    return 1
  }

  let res
  if (stone === 0) {
    res = getStoneLength(1, iterations - 1)
  } else if (`${stone}`.length % 2 === 0) {
    const sliceIdx = Math.floor(`${stone}`.length / 2)
    res =
      getStoneLength(Number(`${stone}`.slice(0, sliceIdx)), iterations - 1) +
      getStoneLength(Number(`${stone}`.slice(sliceIdx)), iterations - 1)
  } else res = getStoneLength(2024 * stone, iterations - 1)

  cache[key] = res
  return res
}

console.log(dataArr.map(s => getStoneLength(Number(s))).reduce((a, b) => a + b, 0))
