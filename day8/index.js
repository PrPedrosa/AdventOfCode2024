import { getDataFromTextFile } from "../getDataFromTextFile.js"

const dataArr = getDataFromTextFile(8)
  .split("\n")
  .map(str => str.split(""))

// needs to be 14 for puzzle 1
// needs to be 34 for puzzle 2
const testDataArr =
  "............\n........0...\n.....0......\n.......0....\n....0.......\n......A.....\n............\n............\n........A...\n.........A..\n............\n............"
    .split("\n")
    .map(str => str.split(""))

let totalIterations = 0
const calculateAntinodeCoordsPuzzle1 = (node1Coords, node2Coords) => {
  const [row1, col1] = node1Coords
  const [row2, col2] = node2Coords

  const rowDiff = row1 - row2
  const colDiff = col1 - col2

  const coords2node1 = [row1 + rowDiff, col1 + colDiff]
  const coords1node2 = [row2 - rowDiff, col2 - colDiff]
  return [coords2node1, coords1node2]
}

const calculateAntinodeCoordsPuzzle2 = (node1Coords, node2Coords) => {
  const [row1, col1] = node1Coords
  const [row2, col2] = node2Coords

  const rowDiff = row1 - row2
  const colDiff = col1 - col2

  let allAntinodes = []

  for (let i = 1; i < 30; i++) {
    allAntinodes.push([row1 + rowDiff * i, col1 + colDiff * i])
    allAntinodes.push([row1 - rowDiff * i, col1 - colDiff * i])
    allAntinodes.push([row2 - rowDiff * i, col2 - colDiff * i])
    allAntinodes.push([row2 + rowDiff * i, col2 + colDiff * i])
    totalIterations++
  }

  return allAntinodes
}

const deleteOutOfBoundsAntinodes = (antinodesCoords, arr) => {
  const maxRowValue = arr.length - 1
  const maxColValue = arr[0].length - 1

  for (const stringCoord of antinodesCoords.values()) {
    const [antinodeRow, antinodeCol] = JSON.parse(stringCoord)
    if (antinodeRow < 0 || antinodeCol < 0 || antinodeRow > maxRowValue || antinodeCol > maxColValue) {
      antinodesCoords.delete(stringCoord)
    }
  }
  return antinodesCoords
}

const getAntinodeCoords = (arr, puzzle) => {
  let antinodeCoords = new Set()
  for (let row = 0; row < arr.length; row++) {
    for (let col = 0; col < arr.length; col++) {
      const currentNode = arr[row][col]
      if (currentNode === ".") continue

      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
          const newNode = arr[i][j]

          if (currentNode === newNode && (row !== i || col !== j)) {
            //calculate antinodes antinodeCoords below
            const antinodes =
              puzzle === "puzzle1"
                ? calculateAntinodeCoordsPuzzle1([row, col], [i, j])
                : calculateAntinodeCoordsPuzzle2([row, col], [i, j])

            for (let k = 0; k < antinodes.length; k++) {
              antinodeCoords.add(JSON.stringify(antinodes[k]))
            }
          }
        }
      }
    }
  }

  return deleteOutOfBoundsAntinodes(antinodeCoords, arr)
}

// PUZZLE 1
console.log(getAntinodeCoords(dataArr, "puzzle1").size)

//PUZZLE 2
console.log(getAntinodeCoords(dataArr, "puzzle2").size)
