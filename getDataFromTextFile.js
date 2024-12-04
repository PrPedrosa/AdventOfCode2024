import fs from "fs"
import path from "path"

export const getDataFromTextFile = dayNum => fs.readFileSync(path.resolve(`day${dayNum}/input.txt`), "utf8")
