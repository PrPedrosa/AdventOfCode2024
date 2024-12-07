import { getDataFromTextFile } from "../getDataFromTextFile.js"

const dataArr = getDataFromTextFile(7).split("\n")

// testData PUZZLE 1 must be 3749
// testData PUZZLE 2 must be 11387
// const testDataArr =
//  "190: 10 19\n3267: 81 40 27\n83: 17 5\n156: 15 6\n7290: 6 8 6 15\n161011: 16 10 13\n192: 17 8 14\n21037: 9 7 18 13\n292: 11 6 16 20".split("\n")

// Gives all permutations of the arr
// if arrLength was bigger probably turn permutate() into a generator function?
// or maybe incorporate calculate() inside permutate() so that we dont have to create the giant results array inside permutate()?
const permutateCache = { puzzle1Id: {}, puzzle2Id: {} }
const permutate = (arrLenght, arr, puzzleId) => {
  const results = []

  if (permutateCache[puzzleId][arrLenght]) {
    return permutateCache[puzzleId][arrLenght]
  }

  const backtrack = current => {
    if (current.length === arrLenght) {
      results.push([...current])
      return
    }
    for (const value of arr) {
      current.push(value)
      backtrack(current)
      current.pop() // backtrack
    }
  }

  backtrack([])
  permutateCache[puzzleId][arrLenght] = results
  return results
}

const calculate = (signs, numsArr) => {
  return numsArr.reduce((a, b, i) => {
    const signIdx = i - 1
    const numA = Number(a)
    const numB = Number(b)

    if (signs[signIdx] === "+") {
      return numA + numB
    } else if (signs[signIdx] === "*") {
      return numA * numB
    }

    // Only needed for puzzle 2
    return Number(`${numA}${numB}`)
  })
}

const getResult = (arr, puzzleSigns, puzzleId) => {
  let count = 0

  arr.forEach(stringEquation => {
    const [value, stringNums] = stringEquation.split(": ")
    const expected = Number(value)

    const numsArray = stringNums.split(" ")
    const numOfSpacesForSigns = numsArray.length - 1

    const signsPossibilities = permutate(numOfSpacesForSigns, puzzleSigns, puzzleId)

    for (let i = 0; i < signsPossibilities.length; i++) {
      const signs = signsPossibilities[i]
      const calcValue = calculate(signs, numsArray)
      if (calcValue === expected) {
        count += calcValue
        return
      }
    }
  })
  return count
}

// PUZZLE 1
const puzzle1Signs = ["+", "*"]
const puzzle1Id = "puzzle1Id"

const startPuzzle1 = performance.now()
console.log(getResult(dataArr, puzzle1Signs, puzzle1Id))
console.log("PUZZLE 1 took:", (performance.now() - startPuzzle1) / 1000, "s")

// PUZZLE 2
const puzzle2Signs = ["+", "*", "||"]
const puzzle2Id = "puzzle2Id"

const startPuzzle2 = performance.now()
console.log(getResult(dataArr, puzzle2Signs, puzzle2Id))
console.log("PUZZLE 2 took:", (performance.now() - startPuzzle2) / 1000, "s")
