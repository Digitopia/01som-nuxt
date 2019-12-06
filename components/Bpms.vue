<template>
  <div class="right centered d-flex justify-content-around">
    <button
      v-for="bpmVal in bpms"
      :key="bpmVal"
      :class="{ active: bpmVal === bpm }"
      @click="click(bpmVal)"
    >
      {{ bpmVal }}
    </button>
  </div>
</template>

<script>
import Tone from 'tone'

export default {
  data() {
    return {
      bpms: [44, 52, 60, 80, 100, 120],
      bpm: 60,
    }
  },

  watch: {
    bpm() {
      Tone.Transport.bpm.value = this.bpm
    },
  },
  methods: {
    click(bpm) {
      this.bpm = bpm
    },
  },
}
</script>

<style lang="scss" scoped>
div {
  flex-direction: column;
}

button {
  background-color: var(--lightblue);
  color: white;
  border: none;
  display: block;
  text-align: center;
  border-radius: 100%;
  &.active {
    color: lightslategrey;
  }
  &:hover {
    color: grey;
  }
}
</style>
