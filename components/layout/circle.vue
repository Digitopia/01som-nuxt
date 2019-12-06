<template>
  <fragment>
    <div id="icons" class="left centered d-flex justify-content-around">
      <KickIcon class="icon" fill="var(--blue)" />
      <ClapIcon class="icon" fill="var(--green)" />
      <SnapIcon class="icon" fill="var(--red)" />
    </div>
    <div id="svg" class="content centered">
      <slot />
    </div>
    <Bpms id="bpms" />
  </fragment>
</template>

<script>
import KickIcon from '@/static/images/kick.svg?inline'
import ClapIcon from '@/static/images/clap.svg?inline'
import SnapIcon from '@/static/images/snap.svg?inline'
import Bpms from '@/components/Bpms.vue'

export default {
  components: {
    Bpms,
    KickIcon,
    ClapIcon,
    SnapIcon,
  },
}
</script>

<style lang="scss">
.icon {
  width: 5em;
  height: 5em;
}

svg {
  width: 100vw;
  height: 400px;
  margin: 0 auto;
}
</style>
