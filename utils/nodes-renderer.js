import tabsComponent from "../components/article/a-tabs"
import buttonComponent from "../components/article/a-button"
import { BLOCKS, INLINES } from "@contentful/rich-text-types"

export const renderNodes = () => {
  const renderTabs = (node, key, h, next) => {
    const tabs = node.data.target.fields.tabs.map(
      ({ fields: { name, text } }) => ({ name, text })
    )
    return h(
      tabsComponent,
      { key, props: { tabs } },
      next(node.content, { key }, h, next)
    )
  }

  return {
    [BLOCKS.PARAGRAPH]: (node, key, h, next) => {
      const nodes = node.content
        .map((item) => {
          if (item.nodeType === "text") {
            return { ...item, value: item.value.trim() ? item.value : "" }
          } else {
            return item
          }
        })
        .filter(({ value, nodeType }) => {
          return nodeType === "text" ? value.length : true
        })
      return nodes.length
        ? h("p", { key: key }, next(nodes, key, h, next))
        : null
    },
    [BLOCKS.EMBEDDED_ENTRY]: (node, key, h, next) => {
      const type = node.data.target.sys.contentType.sys.id
      if (type === "tabbedText") {
        return renderTabs(node, key, h, next)
      }
    },
    [INLINES.EMBEDDED_ENTRY]: (node, key, h, next) => {
      const { sys, fields } = node.data.target
      const type = sys.contentType.sys.id
      if (type === "button") {
        return h(
          buttonComponent,
          {
            key,
            props: { to: { path: fields.link }, text: fields.text || "" },
          },
          next(node.content, { key }, h, next)
        )
      }
    },
  }
}
