<script setup lang="ts">
import type { WebIcon } from './types'

const props = withDefaults(defineProps<WebIcon>(), {
  url: '//at.alicdn.com/t/c/font_4603952_o9h6q48vo58.css',
  name: '',
  prefix: 'icon',
  fontFamily: 'iconfont',
})

onBeforeMount(() => {
  if (props.url) {
    const existingLink = document.querySelector(`link[href="${props.url}"]`)
    if (!existingLink) {
      const link = document.createElement('link')
      link.href = props.url
      link.rel = 'stylesheet'
      document.head.appendChild(link)
    }
  }
})

const className = computed(() => `${props.fontFamily} ${props.prefix}-${props.name}`)
</script>

<template>
  <i :class="className" />
</template>

<style scoped lang="scss"></style>
