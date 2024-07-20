<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { IconProps } from './types'

const props = defineProps<IconProps>()
</script>

<template>
  <!-- v-clock: solve the problem of shiner screen -->
  <!-- for example, it will show {{ message }} when loading page if the net speed is so slow -->
  <component :is="Icon" v-cloak v-bind="props" />
</template>

<style scoped lang="scss">

</style>
