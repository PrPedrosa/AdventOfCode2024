import { getDataFromTextFile } from "../getDataFromTextFile.js"

const data = getDataFromTextFile(5)

// testData needs to be 143 for PUZZLE 1
// testData needs to be 123 for PUZZLE 2
// const testData =
// "47|53\n97|13\n97|61\n97|47\n75|29\n61|13\n75|53\n29|13\n97|29\n53|29\n61|53\n97|53\n61|29\n47|13\n75|47\n97|75\n47|61\n75|61\n47|29\n75|13\n53|13\n\n75,47,61,53,29\n97,61,53,29,13\n75,29,13\n75,97,47,61,53\n61,13,29\n97,13,75,29,47"

const { puzzleRules, puzzlePages } = data.split("\n").reduce(
  (obj, str) => {
    if (str.length && str.includes("|"))
      return { puzzleRules: [...obj.puzzleRules, str.split("|")], puzzlePages: obj.puzzlePages }
    if (str.length !== 0) return { puzzleRules: obj.puzzleRules, puzzlePages: [...obj.puzzlePages, str.split(",")] }
    return obj
  },
  { puzzleRules: [], puzzlePages: [] }
)

const isValidPageNum = (pageNum, rule, page) => {
  let isBefore = true

  for (let i = 0; i < page.length; i++) {
    const [rule1, rule2] = rule
    const otherPageNum = page[i]
    if (pageNum === otherPageNum) {
      isBefore = false
      continue
    }

    // rule does not apply
    if (!((pageNum === rule1 && otherPageNum === rule2) || (pageNum === rule2 && otherPageNum === rule1))) continue

    if (pageNum !== rule1 && !isBefore) return false
    if (pageNum !== rule2 && isBefore) return false
  }
  return true
}

const getUpdates = (rules, pages) => {
  const correctUpdates = []
  const incorrectUpdates = []

  pages.forEach(page => {
    let isCorrect = true

    /* for (let i = 0; i < rules.length; i++) {
      if (!isCorrect) break
      const rule = rules[i]
      for (let j = 0; j < page.length; j++) {
        if (!isValidPageNum(page[j], rule, page)) {
          isCorrect = false
          break
        }
      }
    } */

    // Same thing as commented for loops above
    rules.forEach(rule => {
      if (!isCorrect) return
      page.forEach(pageNum => {
        if (!isValidPageNum(pageNum, rule, page)) {
          isCorrect = false
          return
        }
      })
    })

    if (isCorrect) correctUpdates.push(page)
    else incorrectUpdates.push(page)
  })

  return [correctUpdates, incorrectUpdates]
}

const sumPages = pages =>
  pages.reduce((acc, page) => {
    const middle = page[Math.floor(page.length / 2)]
    return acc + Number(middle)
  }, 0)

const [correctUpdates, incorrectUpdates] = getUpdates(puzzleRules, puzzlePages)

// PUZZLE 1
const totalPuzzle1 = sumPages(correctUpdates)
console.log("PUZZLE 1 answer is: ", totalPuzzle1)

// PUZZLE 2
const filterRule = (rule, update) => update.includes(rule[0]) && update.includes(rule[1])

const orderUpdate = (page, rules) => {
  let newPage = [...page]

  for (let i = 0; i < page.length; i++) {
    for (let j = 0; j < rules.length; j++) {
      const pageNum = page[i]
      const rule = rules[j]

      if (!isValidPageNum(pageNum, rule, page)) {
        if (pageNum === rule[0]) {
          newPage = [pageNum, ...newPage]
          newPage.splice(i, 1)
        } else {
          newPage = [...newPage, pageNum]
          newPage.splice(i, 1)
        }
        return orderUpdate(newPage, rules)
      }
    }
  }

  return newPage
}

const getOrderedUpdate = update => {
  const rulesThatApply = puzzleRules.filter(rule => filterRule(rule, update))
  return orderUpdate(update, rulesThatApply)
}

const orderedUpdates = incorrectUpdates.map(getOrderedUpdate)
const totalPuzzle2 = sumPages(orderedUpdates)

console.log("PUZZLE 2 answer is: ", totalPuzzle2)
