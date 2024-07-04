<script setup lang="ts">
defineProps({
  tag: {
    type: String,
    default: 'i',
  },
  iconClass: {
    type: String,
    default: 'text-3xl',
  },
})
const { isFullscreen, toggle } = useFullscreen()
</script>

<template>
  <component
    :is="tag"
    class="cursor-pointer"
    :class="[isFullscreen ? 'i-octicon:screen-normal-24' : 'i-octicon:screen-full-24', iconClass]" @click="toggle"
  />
</template>

<style scoped lang="scss"></style>
