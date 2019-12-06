import Tone from 'tone'

export default n => {
  return {
    data() {
      return {
        sessionNumber: n,
        recording: false,
      }
    },

    mounted() {
      // this.$root.$on('play', this.play)
    },

    computed: {
      sessionTitle() {
        return this.$t('sessionNames')[this.sessionNumber - 1]
      },
    },

    methods: {
      stop() {
        Tone.Transport.stop()
      },
    },

    head() {
      return {
        title: this.sessionTitle,
      }
    },
  }
}
