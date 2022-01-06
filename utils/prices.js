const pages = require("./pages.js")
const { items } = require("./menu.js")

const prices = []

const getPriceList = id => {
  return pages[id].priceList
}

for (const menuItem of items.main) {
  const category = menuItem.name
  const pages = []

  for (const { name, id } of menuItem.subPages) {
    const priceList = getPriceList(id)
    if (priceList) {
      if (menuItem.page) {
        pages.push({
          name,
          priceList
        })
      } else {
        prices.push({
          category: name,
          priceList
        })
      }
    }
  }

  if (pages.length) {
    prices.push({
      category,
      pages
    })
  }
}

// console.log(JSON.stringify(prices, null, 2))

module.exports = prices
