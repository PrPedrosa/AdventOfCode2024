import { isSafeReport } from "./isSafeReport.js"
import { getDataFromTextFile } from "../getDataFromTextFile.js"

const data = getDataFromTextFile(2)
const reports = data.split("\n")

// PUZZLE 1
let numOfSafeReports = 0

reports.forEach(report => {
  const reportNums = report.split(" ")
  const isSafe = isSafeReport(reportNums)
  if (isSafe) {
    numOfSafeReports++
    return
  }
})

console.log("PUZZLE 1 answer is:", numOfSafeReports)

// PUZZLE 2
let numOfSafeReports2 = 0

reports.forEach(report => {
  const reportNums = report.split(" ")

  if (isSafeReport(reportNums)) {
    numOfSafeReports2++
    return
  }

  for (let x = 0; x < reportNums.length; x++) {
    const newReportNums = reportNums.toSpliced(x, 1)
    if (isSafeReport(newReportNums)) {
      numOfSafeReports2++
      return
    }
  }
})

console.log("PUZZLE 2 answer is:", numOfSafeReports2)
