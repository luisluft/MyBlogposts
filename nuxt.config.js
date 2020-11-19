export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "luft-app",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Open+Sans"
      }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ["~assets/styles/main.css"],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ["~/plugins/hello.js"],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: ["@nuxtjs/axios"],

  // axios module configuration
  axios: {
    baseURL: process.env.BASE_URL || "https://myblog-25439.firebaseio.com"
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},

  // environment variables
  env: {
    baseUrl: process.env.BASE_URL || "https://myblog-25439.firebaseio.com",
    APIkey: "AIzaSyBXF8Ey1CIvtaBRB_BTRLSEP-nmLRMzOKM"
  }
};
