<template>
  <div></div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
#loader {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 1;
  border-radius: 50%;
  border: 8px solid #f3f3f3;
  border-top: 8px solid #555;
  width: 80px;
  height: 80px;
  margin: -40px 0 0 -40px;
  animation: spin 1.5s linear infinite;
  -webkit-animation: spin 1.5s linear infinite;
  opacity: 0.8;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
