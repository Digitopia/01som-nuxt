export const state = () => ({
  debug: false,
  bpm: 60,
  players: [],
})

export const mutations = {
  setBPM(state, bpm) {
    state.bpm = bpm
  },

  loadSounds(options) {},
}
