<script setup lang="ts">
import type { SvgIcon } from './types'

const props = withDefaults(defineProps<SvgIcon>(), {
  prefix: 'icon',
  name: 'SvgIcon',
  color: 'green',
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>

<template>
  <svg aria-hidden="true" class="w-4 h-4">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<style scoped lang="scss"></style>
