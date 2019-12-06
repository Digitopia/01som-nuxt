<template>
  <SessionLayout :session-number="sessionNumber">
    <CircleLayout>
      <Circle01som
        v-for="(circle, idx) in circles"
        :key="`circle${idx}`"
        :ref="`circle${idx}`"
        :x="circle.x"
        :y="circle.y"
        :n="circle.n"
        :options="circle.options"
      >
        <Point
          v-for="i in circle.n"
          :key="i - 1"
          :order="i - 1"
          :n="circle.n"
          :options="circle.options"
          class="point"
        />
      </Circle01som>
    </CircleLayout>
  </SessionLayout>
</template>

<script>
import Circle01som from '@/components/Circle01som.vue'
import Point from '@/components/Point.vue'
import SessionLayout from '@/components/layout/session.vue'
import CircleLayout from '@/components/layout/circle.vue'
import SessionMixin from '@/mixins/session.js'

export default {
  components: {
    SessionLayout,
    CircleLayout,
    Circle01som,
    Point,
  },

  mixins: [SessionMixin(1)],

  props: {
    sessionNumber: {
      type: Number,
      required: true,
    },

    circles: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss"></style>
