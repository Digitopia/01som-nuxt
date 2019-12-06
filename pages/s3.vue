<template>
  <Circle01somPage ref="page" :session-number="1" :circles="circles" />
</template>

<script>
import Tone from 'tone'
import Circle01somPage from '@/components/Circle01somPage.vue'
import options from '@/data/circleOptions.js'

export default {
  components: {
    Circle01somPage,
  },

  data() {
    return {
      sequencer: [1, 2, 3],
      circles: [
        {
          n: 8,
          options: options.colors,
          x: 0,
          y: 0,
          sequencer: this.sequencer,
        },
        {
          n: 8,
          options: options.notes,
          x: 0,
          y: 0,
          sequencer: this.sequencer,
        },
      ],
    }
  },

  mounted() {
    window.Tone = Tone
    // TODO: shouldn't be needing to use an index after the $refs selector
    this.circles[0].x = this.$refs.page.$refs.circle0[0].$el.clientWidth / 2
    this.circles[0].y = this.$refs.page.$refs.circle0[0].$el.clientHeight / 2
    this.circles[1].x = this.$refs.page.$refs.circle1[0].$el.clientWidth / 2
    this.circles[1].y = this.$refs.page.$refs.circle1[0].$el.clientHeight / 2
  },
}
</script>

<style lang="scss"></style>
