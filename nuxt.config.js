export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'weather-app-nuxt-new',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      /* {
        rel: 'preload',
        href: 'https://fonts.googleapis.com/css2?family=Lato:wght@300;400;600;700&display=swap',
        as: 'style',
        onload:
          "this.onload=null; this.rel='stylesheet'; document.body.classList.add('fontLoaded')",
      }, */
      {
        rel: 'dns-prefetch',
        href: 'https://images.unsplash.com/photo-1543699936-c901ddbf0c05?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=20',
      },
      /* {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: true,
      }, */
      /* {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap',
      }, */
      {
        rel: 'dns-prefetch',
        href: 'https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  styleResources: {
    scss: ['~/assets/scss/main.scss'],
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    'nuxt-windicss',
    '@nuxtjs/style-resources',
    '@nuxtjs/composition-api/module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'ru',
      name: "How's weather?",
    },
    meta: {
      name: "How's weather?",
      author: 'Leonid Radostnov, Леонид Радостнов, prostoleo',
      description:
        'Узнайте погоду быстро и легко.Прогноз погоды на 7 дней. Прогноз погоды на 24 часа. Прогноз погоды по миру',
      theme_color: '#b3eaf9',
      lang: 'ru',
      ogHost: 'https://prostoleo-weather.netlify.app',
      ogImage: true,
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
