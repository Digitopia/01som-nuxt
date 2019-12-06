<template>
  <fragment>
    <div id="wrapper" class="container">
      <div id="header" class="row">
        <div id="info" class="left centered"></div>
        <div id="title" class="content centered">
          <div class="subtitle">
            <h4>{{ $t('session') }} {{ sessionNumber }}</h4>
          </div>
          <div class="title">
            <h2>
              {{ sessionTitle }}
            </h2>
          </div>
        </div>
        <div id="help" class="right centered">
          <i
            class="fa fa-question-circle help-icon"
            data-toggle="modal"
            data-target="#instructions"
          ></i>
        </div>
      </div>
      <div id="main" class="row">
        <slot />
      </div>
      <div class="row">
        <Controls id="controls" />
      </div>
    </div>
    <!-- <div id="breakpoint"></div> -->
    <!-- <div id="loader"></div> -->
    <div id="instructions" class="modal fade hide" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button
              class="close"
              type="button"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body text-center">
            <p class="text-muted">
              {{ $t(`help.${helpTextKey}`) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </fragment>
</template>

<script>
import Controls from '@/components/Controls.vue'

export default {
  components: {
    Controls,
  },

  props: {
    sessionNumber: {
      type: Number,
      required: true,
    },
  },

  computed: {
    sessionTitle() {
      // TODO: this should be in a mixin as well, but ain't being able to initialize the mixin here with the prop
      return this.$t('sessionNames')[this.sessionNumber - 1]
    },

    helpTextKey() {
      if ([1, 2, 3].includes(this.sessionNumber)) return 'circle'
      else return `session${this.sessionNumber}`
    },
  },
}
</script>

<style lang="scss">
@import '~assets/styles/interaction.scss';

#wrapper {
  flex: 1 0 auto; /* grow, shrink, basis */
  flex-direction: column;
}

#help {
  i:hover {
    color: var(--default);
  }
}

#title {
  color: var(--default);
  flex-direction: column;
  a {
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
  h1 {
    margin: 0;
  }
  .subtitle h4 {
    margin-top: 10px;
  }
}
</style>
