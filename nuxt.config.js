export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "ESA ACADEMY 生徒管理システム",
    titleTemplate: "%s | ESA ACADEMY 生徒管理システム",
    htmlAttrs: {
      lang: "ja",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/static/css/style.css", "sanitize.css"],

  env: {
    //文字列になるように「"」で囲んでね！
    ApiKey: "AIzaSyBkjTuwQA08PbaZ_jzgujtSF1kVpoJ1xFo",
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: "~/plugins/persistedstate.js", ssr: false }],

  mode: 'spa',

  router: {
    middleware: ["auth"],
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/vuetify", "@nuxtjs/date-fns"],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/axios",
    "nuxt-fontawesome",
    "cookie-universal-nuxt",
    [
      "@nuxtjs/firebase",
      {
        config: {
          apiKey: "AIzaSyBkjTuwQA08PbaZ_jzgujtSF1kVpoJ1xFo",
          authDomain: "nuxt-auth-cb78b.firebaseapp.com",
          projectId: "nuxt-auth-cb78b",
          storageBucket: "nuxt-auth-cb78b.appspot.com",
          messagingSenderId: "960156403431",
          appId: "1:960156403431:web:f5f51506d14ef9d4c0c442",
          measurementId: "G-RNPP6SPE3W",
        },
        services: {
          auth: {
            persistence: "none",
            initialize: {
              // onAuthStateChangedMutation: "ON_AUTH_STATE_CHANGED_MUTATION",
              onAuthStateChangedAction: "onAuthStateChangedAction",
              subscribeManually: false,
            },
            ssr: false, // default
          },
          firestore: true,
          storage: true,
        },
      },
    ],
  ],

  fontawesome: {
    component: "fa",
    imports: [
      {
        set: "@fortawesome/free-solid-svg-icons", // Solidアイコン
        icons: ["faHome", "faPlus", "faAngleRight", "faSearch"],
      },
    ],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
