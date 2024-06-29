<script setup lang="ts">
import { Icon, loadIcons } from '@iconify/vue'
import json from '@iconify/json/json/mdi.json'
import star from '@/assets/icons/svg/xing.svg'

const arr: string[] = Object.keys(json.icons)
const iconRef = ref(arr[0])
onBeforeMount(async () => {
  await loadIcons(arr.map((o: string) => `${json.prefix}:${o}`))
})
onMounted(() => {
  setInterval(() => {
    iconRef.value = `${json.prefix}:${arr[Math.floor(Math.random() * arr.length)]}`
  }, 1000)
})
</script>

<template>
  <SvgIcon name="xing" class="text-4 text-red" />
  <img :src="star" class="text-3xl w-5 h-5 text-red">
  <el-button>default</el-button>
  <el-button type="primary">
    Primary
  </el-button>
  <Icon class="text-3xl text-red cursor-pointer" icon="mdi-light:home" />
  <component :is="Icon" :icon="iconRef" />
</template>

<route lang="yaml">
meta:
  layout: home
</route>
