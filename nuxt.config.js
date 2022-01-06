import { paths } from "./utils/menu"
require("dotenv").config()

const production = process.env.NETLIFY && process.env.BRANCH === "master"

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  env: {
    production,
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
      { name: "msapplication-TileColor", content: "#e91e63" },
      { name: "theme-color", content: "#ffffff" },
    ],
    link: [
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#e91e63" },
    ],
    script: [
      ...(production
        ? [
          {
            hid: "external",
            src: "/external.js",
            defer: true,
          },
        ]
        : []),
    ],
  },

  loading: { color: "#e91e63" },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["reset-css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: "~/plugins/fragment",
    },
    {
      src: "~/plugins/contentful-rich-text",
    },
    {
      src: "~/plugins/vue-lazysizes.client.js",
    },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/sitemap"],

  sitemap: {
    path: "/sitemap.xml",
    hostname: "https://jafrasalonkosmetyczny.pl",
    cacheTime: 1000 * 60 * 15,
    gzip: true,
    routes: paths.map((path) => ({
      url: path,
      changefreq: "weekly",
      priority: 1,
      lastmod: new Date().toISOString(),
    })),
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/style-resources"],

  styleResources: {
    scss: ["~/styles/misc.scss", "~/styles/theme.scss"],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, { isClient, loaders: { vue } }) {
      if (isClient) {
        // vue.transformAssetUrls.img = ["data-src", "src"]
        vue.transformAssetUrls.source = ["data-srcset", "srcset"]
      }
    },
  },

  generate: {
    routes() {
      return paths
    },
  }
}
