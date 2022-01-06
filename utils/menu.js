const { items: entries } = require("../contentful-data.json")

const items = {}
let paths = []

entries
  .filter((entry) => entry.sys.contentType.sys.id === "mainMenu")
  .forEach((entry) => {
    items[entry.fields.type] = entry.fields.subMenu
      .filter((subMenu) => subMenu.fields)
      .map((subMenu) => {
        if (subMenu.fields.slug !== "index" && !subMenu.fields.pages) {
          paths.push(`/${subMenu.fields.slug || ""}`)
        }
        return {
          name: subMenu.fields.name,
          page: subMenu.fields.slug,
          subPages: (subMenu.fields.pages || [])
            .filter((page) => !!page.fields)
            .map((page) => {
              if (subMenu.fields.slug !== "index") {
                if (subMenu.fields.slug) {
                  paths.push(`/${subMenu.fields.slug}/${page.fields.slug}`)
                } else {
                  paths.push(`/${page.fields.slug || ""}`)
                }
              }
              return {
                name: page.fields.name,
                page: page.fields.slug,
                id: page.sys.id,
              }
            }),
        }
      })
  })

paths = paths.map((path) => path)
// console.log(JSON.stringify(items, null, 2))

module.exports = {
  items,
  paths,
}
