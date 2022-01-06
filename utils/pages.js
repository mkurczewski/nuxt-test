const { items } = require("../contentful-data.json")

const pages = {}

items
  .filter(
    item =>
      item.sys.contentType.sys.id === "single-service" ||
      item.sys.contentType.sys.id === "home-page"
  )
  .forEach(item => {
    pages[item.sys.id] = {
      slug: item.sys.contentType.sys.id === "home-page" ? "index" : "",
      ...item.fields,
      mainPicture: item.fields.mainPicture
        ? item.fields.mainPicture.fields.file.url.slice(2)
        : null,
      gallery: (item.fields.gallery || []).map(image => image.fields.file.url),
      description: (item.fields.description || []).map(article => {
        return {
          ...article.fields,
          image: article.fields.image
            ? article.fields.image.fields.file.url
            : null
        }
      }),
      details: item.fields.details ? item.fields.details.fields : null,
      sections: (item.fields.sections || []).map(section => {
        return {
          articles: section.fields.sections.map(article => {
            return {
              ...article.fields,
              image: article.fields.image
                ? article.fields.image.fields.file.url
                : null
            }
          })
        }
      })
    }
  })

// console.log(JSON.stringify(pages, null, 2))

module.exports = pages
