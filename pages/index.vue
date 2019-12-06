<template>
  <div>
    <main role="main">
      <section class="jumbotron text-center">
        <div class="container">
          <h1 class="jumbotron-heading">0 + 1 = SOM</h1>
          <br />
          <p class="lead text-muted">{{ $t('intro.p1') }}</p>
          <p class="lead text-muted">{{ $t('intro.p2') }}</p>
        </div>
      </section>
    </main>
    <div class="album py-5 bg-light">
      <div class="container">
        <div class="row">
          <div
            v-for="(session, idx) in sessions"
            :key="idx"
            :class="{ disabled: session.disabled }"
            class="col-lg-4 col-sm-6 col-centered session-card"
          >
            <div class="card mb-3 box-shadow">
              <nuxt-link :to="session.url">
                <div class="card-item">
                  <img
                    :src="require(`assets/${session.img}`)"
                    :class="{ grey: session.disabled }"
                    alt="Card image cap"
                    class="card-img-top"
                  />
                </div>
              </nuxt-link>
              <div class="card-body text-centered">
                <span class="card-text">
                  {{ $t('session') }} {{ session.id }}
                </span>
                <a v-if="session.disabled" :href="session.url">
                  {{ $t('sessionNames')[idx] }}
                </a>
                <span v-if="!session.disabled">
                  {{ $t('sessionNames')[idx] }}
                </span>
                <span
                  v-if="session.disabled"
                  class="card-text"
                  style="font-size: 0.8em;"
                  >{{ $t('soon') }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer id="sponsors" class="footer centered">
      <a
        v-for="sponsor in sponsors"
        :key="sponsor.name"
        :href="sponsor.url"
        target="blank"
        ><img :src="require(`assets/${sponsor.image}`)" />
      </a>
    </footer>
  </div>
</template>

<script>
import sessions from '@/data/sessions.js'

export default {
  layout: 'default',

  data() {
    return {
      sessions,
      sponsors: [
        {
          name: 'digitopia',
          image: 'images/logos/digitopia.png',
          url: 'http://digitopia.github.io/',
        },
        {
          name: 'bma',
          image: 'images/logos/bma.png',
          url: 'http://www.bragamediaarts.com',
        },
        {
          name: 'cmbraga',
          image: 'images/logos/cmbraga.png',
          url: 'https://www.cm-braga.pt/',
        },
      ],
    }
  },

  head: {
    title: '0 + 1 = SOM',
    titleTemplate: '',
  },
}
</script>

<style lang="scss">
:root {
  --jumbotron-padding-y: 3rem;
}

.jumbotron {
  padding-top: var(--jumbotron-padding-y);
  padding-bottom: var(--jumbotron-padding-y);
  margin-bottom: 0;
  background-color: #fff;
  p:last-child {
    margin-bottom: 0;
  }
  .jumbotron-heading {
    font-weight: 300;
  }
  .container {
    max-width: 40rem;
  }
}

@media (min-width: 768px) {
  .jumbotron {
    padding-top: calc(var(--jumbotron-padding-y) * 2);
    padding-bottom: calc(var(--jumbotron-padding-y) * 2);
  }
}

footer {
  padding-top: 3rem;
  padding-bottom: 3rem;
  p {
    margin-bottom: 0.25rem;
  }
}

.box-shadow {
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.05);
}

.session-card {
  .card-body {
    height: 80px;
    vertical-align: middle;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
  }

  .card-title {
    margin-bottom: 0;
  }

  .grey {
    filter: grayscale(100%);
    opacity: 0.5;
  }

  .card-body {
    text-align: center;
  }

  .card-item {
    overflow: hidden;
  }

  img {
    max-width: 100%;
    transition: all 0.3s;
    &:hover {
      transform: scale(1.05);
    }
  }

  .card-text {
    font-size: 0.85em;
  }

  .disabled {
    cursor: not-allowed !important;
    img:hover {
      cursor: not-allowed !important;
      transform: unset !important;
    }
  }
}

#sponsors {
  img {
    opacity: 0.4;
    width: 50%;
    &:hover {
      filter: none;
      opacity: 0.6;
    }
  }
}
</style>
