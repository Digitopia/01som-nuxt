<template>
  <svg>
    <g :transform="`translate(${x} ${y})`">
      <circle :cx="0" :cy="0" :r="r" class="main"></circle>
      <g class="points"><slot /></g>
      <g class="sequencer">
        <g v-for="label in labels" :key="label">
          <rect :x="100" :width="labelSize" :height="labelSize"></rect>
          <text :x="100">{{ label }}</text>
        </g>
      </g>
    </g>
  </svg>
</template>

<script>
import Tone from 'tone'
import { mapState } from 'vuex'

export default {
  props: {
    x: {
      type: Number,
      required: true,
    },

    y: {
      type: Number,
      required: true,
    },

    n: {
      type: Number,
      required: true,
    },

    options: {
      type: Array,
      required: true,
    },

    sequencer: {
      type: Array,
      default: () => [],
    },

    shake: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      r: 150,
      ...mapState(['bpm']),
      players: {},
    }
  },

  computed: {
    labelSize() {
      return 10
    },
  },

  mounted() {
    this.$root.$on('play', this.play)
    this.$root.$on('stop', this.stop)
    this.$root.$on('playsample', this.playSample)
    this.init()
  },

  methods: {
    init() {
      window.addEventListener('resize', () => this.resize())
      if (this.shake) this.initShake()
      this.initAudio()
      this.initLabels()
    },

    initShake() {
      // TODO:
    },

    initLabels() {
      if (!this.sequencer) return

      // const rfunc = () =>
      //     Math.min(
      //       250,
      //       Math.min(app.width, app.height) / 2 - app.padding - app.pointRadius
      //     )

      const rFunc = () => 123

      this.labels = new Array(this.sequencer.length)
      this.labels.forEach((label, idx) => {
        const step = (2 * rFunc()) / (this.sequencer.length + 1)
        const x0 = -rFunc() + step
        const x = x0 + step * idx
        const size = 20
        label.x = x - size / 2
        label.y = -size / 2
        label.width = size
        label.height = size
      })
    },

    initAudio() {
      this.options.forEach(option => {
        const { sample } = option
        if (!(sample in this.players)) {
          const path = `/sounds/samples/${sample}.mp3`
          const player = new Tone.Player(path).toMaster()
          this.players[sample] = player
        }
      })
    },

    shaked() {
      if (this.app.playing) this.app.playing = false
      if (!this.sequencer) this.points.forEach(point => point.reset())
      else {
        this.sequencer.points.forEach(points =>
          points.forEach(point => point.reset())
        )
      }
    },

    play() {
      let counter = 0
      this.loop = new Tone.Loop(time => {
        const idx = counter++ % this.n
        this.$root.$emit('playdot', { idx, time })
      }, '8n').start(0)
    },

    playSample(sample) {
      this.players[sample].start()
    },

    resize() {},
    /**
     * This schedules the note play events (ahead of time) whenever a user hits the play button.
     */
    schedule() {
      this.loop = Tone.Loop(time => {
        const idx = this.loop.progress * this.n
        this.$root.$emit('playdot', { idx, time })
      }, '8n').start(0)
    },

    stop() {
      this.loop.dispose()
    },

    /**
     * This serves to redistribute the labels according to the new size of the
     * radius of the circle, while maintaining the same size for the labels and text
     */
    alignSequencer() {
      this.sequencer.labels.forEach((label, index) => {
        const step = (2 * this.rFunc()) / (this.sequencer.n + 1)
        const x0 = -this.rFunc() + step
        const x = x0 + step * index
        window.label = label
        label.text.attr({ x })
        const size = this.sequencerRectSize
        label.rect.attr({
          x: x - size / 2,
          y: -size / 2,
          width: size,
          height: size,
        })
      })
    },
  },
}
</script>

<style scoped>
/* @import '../styles/colors.scss'; */

circle.main {
  fill: var(--lightblue);
  stroke: var(--grey);
  stroke-width: 3;
}
:root {
  overflow: hidden;
}
</style>
