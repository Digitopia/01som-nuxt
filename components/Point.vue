<template>
  <g @click="click">
    <circle
      ref="circle"
      :cx="x"
      :cy="y"
      :r="r"
      :fill="fill"
      class="point"
    ></circle>
    <circle v-show="playing" r="2" :cx="dotX" :cy="dotY"></circle>
    <text v-show="text" class="point-text" :x="x" :y="y">{{ text }}</text>
  </g>
</template>

<script>
import gsap from 'gsap'

export default {
  props: {
    order: {
      type: Number,
      required: true,
    },

    options: {
      type: Array,
      required: true,
    },

    n: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      x: 0,
      y: 0,
      dotX: 0,
      dotY: 0,
      r: 20,
      state: -1, // -1 means blank
      playing: false,
    }
  },

  computed: {
    radius() {
      return this.$parent.r
    },

    option() {
      if (this.state === -1) return null
      return this.options[this.state]
    },

    fill() {
      if (this.state === -1) return 'white'
      return this.option.color
    },

    sample() {
      if (this.state === -1) return
      return this.option.sample
    },

    text() {
      if (!this.option || !this.option.text) return null
      return this.option.text
    },
  },

  watch: {
    playing() {
      if (this.playing) {
        this.animate()
        if (this.sample) {
          this.$root.$emit('playsample', this.sample)
        }
      }
    },
  },

  mounted() {
    this.$root.$on('playdot', this.play)
    this.init()
  },

  methods: {
    init() {
      this.angle = (this.order / this.n) * 2 * Math.PI - Math.PI / 2
      this.x = this.calculateX(this.radius)
      this.y = this.calculateY(this.radius)

      const dotDistance = this.radius + this.r * 1.75
      this.dotX = this.calculateX(dotDistance)
      this.dotY = this.calculateY(dotDistance)
    },

    calculateX(r) {
      return Math.cos(this.angle) * r
    },

    calculateY(r) {
      return Math.sin(this.angle) * r
    },

    animate() {
      gsap.to(this.$refs.circle, {
        duration: 0.1,
        attr: { r: this.r * 1.4 },
        ease: 'none',
        repeat: 1,
        yoyo: true,
      })
    },

    play(evt) {
      const { idx } = evt
      this.playing = idx === this.order
    },

    click() {
      this.state = this.state === this.options.length - 1 ? -1 : this.state + 1
    },
  },
}
</script>

<style lang="scss" scoped>
.point {
  stroke: var(--grey);
  // stroke-width: 1px;
  cursor: pointer;
}

.point-text {
  stroke: none;
  text-anchor: middle;
  alignment-baseline: central;
}
</style>
