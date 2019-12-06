<template>
  <div id="app" class="v-cloak">
    <header>
      <div id="navbarHeader" class="collapse bg-dark">
        <div class="container">
          <div class="row">
            <div class="col-sm-8 col-md-7 py-4">
              <h4 class="text-white">{{ $t('sessions') }}</h4>
              <ul class="list-unstyled">
                <li v-for="(session, idx) in sessions" :key="session.id">
                  <nuxt-link :to="session.url" class="text-white">
                    {{ session.id }} -
                    {{ $t('sessionNames')[idx] }}
                    <small v-if="session.disabled">{{ $t('soon') }}</small>
                  </nuxt-link>
                </li>
              </ul>
            </div>
            <div id="contact" class="col-sm-4 offset-md-1 py-4">
              <h4 class="text-white">{{ $t('contact') }}</h4>
              <ul class="list-unstyled">
                <li>
                  <a
                    class="text-white"
                    href="https://www.facebook.com/DigitopiaCasaDaMusica/"
                  >
                    <i class="text-white fab fa-facebook"></i>
                  </a>
                </li>
                <li>
                  <a
                    class="text-white"
                    href="https://www.instagram.com/digitopiacasadamusica/"
                  >
                    <i class="text-white fab fa-instagram"></i>
                  </a>
                </li>
                <li>
                  <a class="text-white" href="//digitopia.casadamusica.com">
                    <i class="text-white fa fa-globe"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="navbar navbar-dark bg-dark box-shadow">
        <div class="container d-flex">
          <nuxt-link class="navbar-brand mr-auto" to="/">
            <span><img src="/icons/launcher-icon-512.png" />0 + 1 = SOM</span>
          </nuxt-link>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarHeader"
            aria-controls="navbarHeader"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="p-3">
            <button
              v-for="lang in langs"
              :key="lang"
              :class="{ active: $i18n.locale == lang }"
              class="btn btn-small btn-secondary lang"
              @click="changeLocale(lang)"
            >
              {{ lang.toUpperCase() }}
            </button>
          </div>
        </div>
      </div>
    </header>
    <nuxt />
  </div>
</template>

<script>
import sessions from '@/data/sessions.js'
export default {
  data() {
    return {
      sessions,
      langs: ['pt', 'en'],
    }
  },

  methods: {
    changeLocale(locale) {
      this.$i18n.locale = locale
    },
  },
}
</script>

<style lang="scss">
@import '~assets/styles/colors.scss';
@import '~assets/styles/sizes.scss';

* {
  font-family: Raleway;
}

body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0 auto;
  color: var(--default);
}

[v-cloak] > * {
  display: none !important;
  &::before {
    content: 'loading…';
  }
}

#contact {
  li {
    display: inline;
    margin: 5px;
  }
  i {
    font-size: 30px;
    color: red;
  }
}

.header {
  width: 100%;
}

.content {
  flex: 1 0 auto; /* grow, shrink, basis */
}

.centered {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.footer {
  width: 100%;
}

.lang {
  font-size: 0.9rem;
  margin: 2px;
  border-radius: 20%;
}

a:visited,
a:hover,
a {
  color: var(--default);
}

i,
i:hover,
i:visited {
  color: black;
}

button {
  background-color: var(--lightblue);
  color: white;
  border: none;

  &.active {
    color: lightslategrey;
  }

  &:hover {
    color: grey;
  }
}

#icons {
  flex-direction: column;
}

// NOTE: if launched from home screen, then already in fullscreen and no need to show button for that
@media all and (display-mode: fullscreen) {
  .fullscreen {
    visibility: hidden;
  }
}

header img {
  width: 40px;
  margin-right: 10px;
  transition: none;
  &:hover {
    transform: none;
  }
}

.modal-content {
  opacity: 0.98;
  border: 0;
  border-radius: 30px;
  .modal-header {
    border-bottom: unset;
  }
  .modal-body {
    padding: 10px 20px;
    p {
      font-size: 1em;
    }
    position: relative;
    top: -10px;
  }
}

.not-allowed:hover {
  cursor: not-allowed;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  color: var(--default);
}

.navbar > .container {
  justify-content: unset;
}

.row {
  flex: 1 1 auto; /* grow, shrink, basis */
  display: flex;
}

.grow {
  flex: 1 0 auto;
}

.content {
  flex: 1 0 auto; /* grow, shrink, basis */
}

.centered {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>
