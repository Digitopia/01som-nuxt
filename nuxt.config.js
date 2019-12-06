import messages from './data/i18n.js'

export default {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - 0 + 1 = SOM',

    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/icons/favicon-16x16.png' },
      {
        rel: 'stylesheet',
        href:
          'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css',
      },
      {
        rel: 'stylesheet',
        href:
          'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css',
      },
      // {
      //   rel: 'stylesheet',
      //   href:
      //     'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
      // },
      {
        rel: 'stylesheet',
        href:
          'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.css',
      },
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/vue-fragment.js'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/eslint-module',
    '@nuxtjs/svg',
    '@nuxtjs/sentry',
    [
      'nuxt-i18n',
      {
        locales: [
          {
            code: 'pt',
            iso: 'pt-PT',
          },
          {
            code: 'en',
            iso: 'en-GB',
          },
        ],
        defaultLocale: 'en',
        vueI18n: {
          fallbackLocale: 'en',
          messages,
        },
      },
    ],
  ],

  buildModules: ['@nuxtjs/google-analytics'],

  googleAnalytics: {
    id: '',
  },

  sentry: {
    dsn: '',
  },
  /*
   ** Build configuration
   */
  build: {
    extend: config => {},
  },
}
