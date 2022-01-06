const fs = require("fs-extra")
const cf = require("contentful")
require("dotenv").config()

const {
  BRANCH,
  CONTENTFUL_ACCESS_TOKEN,
  CONTENTFUL_PREVIEW_TOKEN,
  CONTENTFUL_SPACE_ID,
} = process.env

const previewEnvironment = BRANCH === "preview"

const contentful = cf.createClient({
  space: CONTENTFUL_SPACE_ID,
  accessToken: previewEnvironment
    ? CONTENTFUL_PREVIEW_TOKEN
    : CONTENTFUL_ACCESS_TOKEN,
  host: `${previewEnvironment ? "preview" : "cdn"}.contentful.com`,
})

;(async () => {
  try {
    const entries = await contentful.getEntries({ limit: 1000 })
    fs.writeJSONSync("./contentful-data.json", entries)
    console.log("Contentful data downloaded")

    const { items, paths } = require("./menu")
    fs.writeJSONSync("./static-data/menuItems.json", items)
    console.log("Created static menu items")

    fs.writeJSONSync("./static-data/menuPaths.json", paths)
    console.log("Created static menu paths")

    const pages = require("./pages")
    for (const page in pages) {
      fs.writeJSONSync(`./static-data/${page}.json`, pages[page])
    }
    console.log("Created static pages")

    const prices = require("./prices")
    fs.writeJSONSync("./static-data/prices.json", prices)
    console.log("Created pricelist")

    return true
  } catch (e) {
    console.log(e)
  }
})()
