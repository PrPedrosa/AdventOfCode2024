import { getDataFromTextFile } from "../getDataFromTextFile.js"

const data = getDataFromTextFile(6).split("\n")
const dataArr = data.map(str => str.split(""))

// THIS NEEDS TO BE 41 for PUZZLE 1
// THIS NEEDS TO BE 6 for PUZZLE 2
const testData =
  "....#.....\n.........#\n..........\n..#.......\n.......#..\n..........\n.#..^.....\n........#.\n#.........\n......#...".split(
    "\n"
  )
const testDataArr = testData.map(str => str.split(""))

const getStartingGuardPosition = arr => {
  let pos
  for (let row = 0; row < arr.length; row++) {
    for (let col = 0; col < arr[row].length; col++) {
      if (arr[row][col] === "^") pos = { row, col }
    }
  }
  return { ...pos, dir: "up" }
}

const getNextStep = guardCoords => {
  const { dir, row, col } = guardCoords
  switch (dir) {
    case "up":
      return { nextRow: row - 1, nextCol: col }
    case "right":
      return { nextRow: row, nextCol: col + 1 }
    case "left":
      return { nextRow: row, nextCol: col - 1 }
    case "down":
      return { nextRow: row + 1, nextCol: col }
    default:
      throw new Error("WHAT?")
  }
}

const getNextDir = (dir, nested) => {
  if (dir === "up") {
    if (nested === 1) return "right"
    if (nested === 2) return "down"
  }
  if (dir === "right") {
    if (nested === 1) return "down"
    if (nested === 2) return "left"
  }
  if (dir === "down") {
    if (nested === 1) return "left"
    if (nested === 2) return "up"
  }
  if (dir === "left") {
    if (nested === 1) return "up"
    if (nested === 2) return "right"
  }
}

const runPath = (arr, startingGuardCoords) => {
  let guardVisitedPositions = 1
  let guardCoords = startingGuardCoords

  let bumpedIntoWallPositions = new Set()

  while (true) {
    // Only needed for puzzle 1
    if (arr[guardCoords.row][guardCoords.col] !== "^") {
      guardVisitedPositions++
    }
    arr[guardCoords.row][guardCoords.col] = "^"
    // #########################

    const next = getNextStep(guardCoords)

    if (!arr[next.nextRow] || !arr[next.nextRow][next.nextCol]) {
      return guardVisitedPositions
    }

    const nextPath = arr[next.nextRow][next.nextCol]

    if (nextPath === "#") {
      let nextDir = getNextDir(guardCoords.dir, 1)
      let reallyNextPos = getNextStep({ ...guardCoords, dir: nextDir })

      const nextNextPath = arr[reallyNextPos.nextRow][reallyNextPos.nextCol]

      if (nextNextPath === "#") {
        const actualNextDir = getNextDir(guardCoords.dir, 2)
        reallyNextPos = getNextStep({ ...guardCoords, dir: actualNextDir })
        nextDir = actualNextDir
      }

      const setSize = bumpedIntoWallPositions.size
      bumpedIntoWallPositions.add(
        `${guardCoords.row}${guardCoords.col}${reallyNextPos.nextCol}${reallyNextPos.nextRow}`
      )
      if (bumpedIntoWallPositions.size === setSize) {
        // if set size did not increase, means we were here already and are going the same way so we looping
        throw new Error("Looped")
      }

      guardCoords = { col: reallyNextPos.nextCol, row: reallyNextPos.nextRow, dir: nextDir }
      continue
    }

    guardCoords = { col: next.nextCol, row: next.nextRow, dir: guardCoords.dir }
  }
}

// PUZZLE 1

const getResultsPuzzle1 = matrix => runPath(structuredClone(matrix), getStartingGuardPosition(matrix))
console.log("PUZZLE 1 answer is:", getResultsPuzzle1(dataArr))

// PUZZLE 2

const isPathLooped = matrix => {
  try {
    runPath(matrix, getStartingGuardPosition(matrix))
    return false
  } catch (error) {
    return true
  }
}

const getResultPuzzle2 = matrix => {
  let result = 0

  matrix.forEach((line, row) => {
    for (let col = 0; col < line.length; col++) {
      const char = line[col]

      if (char === "^") {
        continue
      }

      let matrixCopy = structuredClone(matrix)
      matrixCopy[row][col] = "#"
      const isLooped = isPathLooped(matrixCopy)
      if (isLooped) {
        result++
      }
    }
  })
  return result
}

const start = performance.now()
console.log("PUZZLE 2 answer is:", getResultPuzzle2(structuredClone(dataArr)))
console.log("PUZZLE 2 took:", (performance.now() - start) / 1000, "s") // around 25s :(
