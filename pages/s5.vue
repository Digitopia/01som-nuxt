<template>
  <SessionLayout :session-number="sessionNumber">
    <div class="bpm-slider-value">{{ bpm }}</div>
    <div id="bpm-slider"></div>

    <div class="grid">
      <div
        v-for="(figure, idx) in filteredFigures"
        :key="`figure-${idx}`"
        class="figure"
        :class="{ span2: figure.span2 }"
        @click="toggle(idx)"
      >
        <component :is="figure.figure" />
      </div>
      <div
        v-for="(value, idx) in values"
        :key="`value-${idx}`"
        class="value text-center"
        :class="{ active: idx == stepActive }"
        @click="toggle(idx)"
      >
        {{ value }}
      </div>
    </div>
  </SessionLayout>
</template>

<script>
import Vue from 'vue'
import Nexus from 'nexusui'
import Tone from 'tone'
import SessionLayout from '@/components/layout/session.vue'
import SessionMixin from '@/mixins/session.js'

import QuarterRest from '~/assets/figures/4r.svg?inline'
import EighthNote from '~/assets/figures/8.svg?inline'
import EighthRest from '~/assets/figures/8r.svg?inline'
import EighthNoteDouble from '~/assets/figures/8x2.svg?inline'

export default {
  components: {
    SessionLayout,
  },

  mixins: [SessionMixin(5)],

  data() {
    return {
      stepActive: -1,
      values: new Array(8).fill(0),
      figures: new Array(8).fill(''),
      bpm: 60,
      images: {
        quarterRest: QuarterRest,
        eighthRest: EighthRest,
        eighthNote: EighthNote,
        eighthNoteDouble: EighthNoteDouble,
      },
    }
  },

  computed: {
    filteredFigures() {
      const ret = []
      this.figures.forEach((figure, idx) => {
        // NOTE: because even though it spans 2 8th notes, it doesn't in the image
        if (idx !== 0 && this.figures[idx - 1] === this.images.quarterRest) {
          ret.push({ figure })
        } else if (figure !== null && figure !== '') {
          ret.push({
            figure,
            span2: figure === this.images.eighthNoteDouble,
          })
        }
      })
      return ret
    },
  },

  watch: {
    values() {
      for (let i = 0; i < this.figures.length; i += 2) {
        const onBeatValue = this.values[i]
        const nextBeatValue = this.values[i + 1]
        const tick = [onBeatValue, nextBeatValue].join(' ')
        switch (tick) {
          case '0 0':
            Vue.set(this.figures, i, this.images.quarterRest)
            Vue.set(this.figures, i + 1, null)
            break

          case '0 1':
            Vue.set(this.figures, i, this.images.eighthRest)
            Vue.set(this.figures, i + 1, this.images.eighthNote)
            break

          case '1 0':
            Vue.set(this.figures, i, this.images.eighthNote)
            Vue.set(this.figures, i + 1, this.images.eighthRest)
            break

          case '1 1':
            Vue.set(this.figures, i, this.images.eighthNoteDouble)
            Vue.set(this.figures, i + 1, null)
            break
        }
      }
    },
  },

  mounted() {
    this.init()

    // NOTE: would be nice to have a vue component for this...
    this.bpmSlider = new Nexus.Slider('#bpm-slider', {
      size: [40, 320],
      mode: 'absolute',
      min: 40,
      max: 160,
      step: 1,
      value: 60,
    })
    this.bpmSlider.colorize('accent', '#eee')
    this.bpmSlider.colorize('fill', '#eee')
    this.bpmSlider.knob.setAttribute('fill', 'var(--green)')

    this.bpmSlider.on('change', value => (this.bpm = value))
  },

  methods: {
    init() {
      this.$root.$on('play', this.play)
      this.$root.$on('stop', this.stop)

      for (let i = 0; i < 8; i += 2) {
        Vue.set(this.figures, i, this.images.quarterRest)
      }
    },

    toggle(idx) {
      Vue.set(this.values, idx, this.values[idx] === 1 ? 0 : 1)
    },

    play() {
      let counter = 0
      this.loop = new Tone.Loop(time => {
        const idx = counter++ % this.values.length
        this.stepActive = idx
      }, '8n').start(0)
    },

    stop() {
      this.loop.dispose()
    },
  },
}
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  width: 80%;
}

#bpm-slider {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.figure {
  width: 100%;
}

.span2 {
  grid-column: span 2;
}

img {
  width: 100%;
}

.bpm-slider-value {
  font-size: 2em;
}

.active {
  color: red;
}
</style>
