import { getDataFromTextFile } from "../getDataFromTextFile.js"

const data = getDataFromTextFile(4)
const dataArr = data.split("\n")
const dataArrPuzzle1 = [...dataArr]
const dataArrPuzzle2 = [...dataArr]

// PUZZLE 1
// TEST DATA => THIS NEEDS TO BE 18
/* const dataArrPuzzle1 =
  "MMMSXXMASM\nMSAMXMSMSA\nAMXSXMAAMM\nMSAMASMSMX\nXMASAMXAMM\nXXAMMXXAMA\nSMSMSASXSS\nSAXAMASAAA\nMAMMMXMMMM\nMXMXAXMASX".split(
    "\n"
  ) */

const matchesPuzzle1 = ["XMAS", "SAMX"]

const getHorizontalXMAS = arr => {
  let XMAS = 0

  arr.forEach(str => {
    for (let i = 0; i < str.length; i++) {
      const relevantString = str[i] + str[i + 1] + str[i + 2] + str[i + 3]
      if (matchesPuzzle1.includes(relevantString)) {
        XMAS++
      }
    }
  })
  return XMAS
}

const getVerticalXMAS = arr => {
  let XMAS = 0

  arr.forEach((str, j) => {
    for (let i = 0; i < str.length; i++) {
      const relevantChars = {
        1: arr[j] ? arr[j][i] : null,
        2: arr[j + 1] ? arr[j + 1][i] : null,
        3: arr[j + 2] ? arr[j + 2][i] : null,
        4: arr[j + 3] ? arr[j + 3][i] : null,
      }
      const relevantString = `${relevantChars[1]}${relevantChars[2]}${relevantChars[3]}${relevantChars[4]}`
      if (matchesPuzzle1.includes(relevantString)) {
        XMAS++
      }
    }
  })
  return XMAS
}

const getDiagonalXMAS = arr => {
  let XMAS = 0

  arr.forEach((str, i) => {
    for (let j = 0; j < str.length; j++) {
      // Check both diagonal directions
      const relevantChars1 = {
        1: arr[i] ? arr[i][j] : null,
        2: arr[i + 1] ? arr[i + 1][j + 1] : null,
        3: arr[i + 2] ? arr[i + 2][j + 2] : null,
        4: arr[i + 3] ? arr[i + 3][j + 3] : null,
      }
      const relevantChars2 = {
        1: arr[i] ? arr[i][j] : null,
        2: arr[i + 1] ? arr[i + 1][j - 1] : null,
        3: arr[i + 2] ? arr[i + 2][j - 2] : null,
        4: arr[i + 3] ? arr[i + 3][j - 3] : null,
      }

      const relevantString1 = `${relevantChars1[1]}${relevantChars1[2]}${relevantChars1[3]}${relevantChars1[4]}`
      const relevantString2 = `${relevantChars2[1]}${relevantChars2[2]}${relevantChars2[3]}${relevantChars2[4]}`

      if (matchesPuzzle1.includes(relevantString1)) {
        XMAS++
      }
      if (matchesPuzzle1.includes(relevantString2)) {
        XMAS++
      }
    }
  })
  return XMAS
}

let numOfXMAS = getHorizontalXMAS(dataArrPuzzle1) + getVerticalXMAS(dataArrPuzzle1) + getDiagonalXMAS(dataArrPuzzle1)
console.log("PUZZLE 1 result is:", numOfXMAS)

// PUZZLE 2
// TEST DATA => NEEDS TO BE 9
/* const dataArrPuzzle2 =
  ".M.S......\n..A..MSMS.\n.M.S.MAA..\n..A.ASMSM.\n.M.S.M....\n..........\nS.S.S.S.S.\n.A.A.A.A..\nM.M.M.M.M.\n..........".split(
    "\n"
  ) */

const findCrossingX_MAS = arr => {
  let X_MAS = 0
  const matchesPuzzle2 = ["MAS", "SAM"]

  arr.forEach((str, i) => {
    for (let j = 0; j < str.length; j++) {
      const pattern = {
        1: arr[i][j],
        2: arr[i][j + 2],

        3: arr[i + 1] ? arr[i + 1][j + 1] : null,

        4: arr[i + 2] ? arr[i + 2][j] : null,
        5: arr[i + 2] ? arr[i + 2][j + 2] : null,
      }

      const relevantString1 = `${pattern[1]}${pattern[3]}${pattern[5]}`
      const relevantString2 = `${pattern[2]}${pattern[3]}${pattern[4]}`

      if (matchesPuzzle2.includes(relevantString1) && matchesPuzzle2.includes(relevantString2)) {
        X_MAS++
      }
    }
  })
  return X_MAS
}

const resultPuzzle2 = findCrossingX_MAS(dataArrPuzzle2)
console.log("PUZZLE 2 result is:", resultPuzzle2)
