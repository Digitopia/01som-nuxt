<template>
  <div class="controls content centered">
    <div v-if="!pwa" class="control fullscreen">
      <i class="fa fa-expand" @click="toggleFullscreen" />
      <span>FULLSCREEN</span>
    </div>
    <div v-else></div>
    <div class="control">
      <i
        class="play far"
        :class="playing ? 'fa-stop-circle' : 'fa-play-circle'"
        @click="playing = !playing"
      />
      <span>{{ playing ? 'STOP' : 'PLAY' }}</span>
    </div>
    <div class="control">
      <i class="far fa-dot-circle" @click="record" />
      <span :class="{ 'recording animated flash infinite slow': recording }"
        >REC</span
      >
    </div>
  </div>
</template>

<script>
import screenfull from 'screenfull'
import Tone from 'tone'
import FileSaver from 'file-saver'

export default {
  data() {
    return {
      pwa: false,
      playing: false,
      recording: false,
      bpm: 60,
    }
  },

  watch: {
    playing() {
      if (this.playing) this.play()
      else this.stop()
    },
  },

  mounted() {
    this.recorder = new window.Recorder(Tone.Master.input)
    window.screenfull = screenfull
    Tone.Transport.bpm.value = this.bpm
  },

  methods: {
    play() {
      if (Tone.context.state === 'suspended') Tone.context.resume()
      Tone.Transport.position = '0:0:0'
      Tone.Transport.start()
      this.$root.$emit('play')
    },

    stop() {
      Tone.Transport.stop()
      this.$root.$emit('stop')
    },

    record() {
      if (!this.playing) this.playing = true
      this.recording = !this.recording
      if (this.recording) {
        this.recorder.record()
      } else {
        this.recorder.stop()
        this.recorder.exportWAV(blob => {
          FileSaver.saveAs(blob, 'Gravação Caça Sons.wav') // TODO: translate this string too
        })
        this.playing = false
      }
    },

    toggleFullscreen() {
      if (screenfull.isEnabled) screenfull.toggle()
    },
  },
}
</script>

<style lang="scss" scoped>
.controls {
  display: flex;
  align-items: center;
  justify-items: flex-start;
  text-align: center;
  svg {
    font-size: 2em;
    &:hover {
      cursor: pointer;
    }
    &:focus {
      outline: none;
    }
  }
  .control {
    width: 100px;
    display: inline-block;
    .control-text {
      padding-top: 2px;
      color: grey;
      font-size: 10px;
    }
    span {
      display: block;
      text-align: center;
    }
  }
  .recording {
    color: rgb(231, 2, 2);
  }
  svg.play {
    font-size: 3.5em !important;
  }
}
</style>
