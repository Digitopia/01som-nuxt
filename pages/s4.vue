<template>
  <div>
    <div id="labels">
      <div v-for="(track, index) in tracks" :key="index">
        {{ $t('tracks')[index] }}
      </div>
      <div v-for="(track, index) in tracks" :id="`track-${index}`" :key="index">
        <button v-for="idx in tracks.length" :key="idx" @click="click(idx)">
          0
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'session',

  data() {
    return {
      tracks: [
        {
          name: 'guit1',
          color: 'rgb(107, 163, 189)',
          sample: `guit1.wav`,
        },
        {
          name: 'guit2',
          color: 'rgb(137, 193, 219)',
          sample: `guit2.wav`,
        },
        {
          name: 'guit3',
          color: 'rgb(167, 223, 249)',
          sample: `guit3.wav`,
        },
        {
          name: 'bass',
          color: 'rgb(227, 132, 148)',
          sample: `baixo.wav`,
        },
        {
          name: 'piano',
          color: 'rgb(223, 218, 162)',
          sample: `piano.wav`,
        },
        {
          name: 'strings',
          color: 'rgb(106, 100, 139)',
          sample: `cordas.wav`,
        },
        {
          name: 'drums1',
          color: 'rgb(84, 129, 99)',
          sample: `bat1.wav`,
        },
        {
          name: 'drums2',
          color: 'rgb(114, 159, 129)',
          sample: `bat2.wav`,
        },
        {
          name: 'drums3',
          color: 'rgb(134, 189, 159)',
          sample: `bat3.wav`,
        },
      ],
    }
  },

  methods: {
    click(i) {
      console.log('clicked', i)
    },
  },
}
</script>

<style>
html {
  background-color: rgb(235, 255, 255);
}

#sequencers button {
  background: transparent;
  text-align: center;
  width: 4em;
  height: 4em;
  margin: 10px;
}
</style>
