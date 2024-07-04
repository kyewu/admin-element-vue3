<script setup lang="ts">
import { Icon, loadIcons } from '@iconify/vue'
import type { IconListType } from './types'
import iconDefaultData from './icon-ep.json'

const props = withDefaults(defineProps<IconListType>(), {
  collection: 'ep',
  iconData: () => iconDefaultData,
  showTextFlag: false,
  searchValue: '',
})
const emits = defineEmits(['click'])
const data = computed(() => (props.searchValue === '' ? props.iconData : props.iconData.filter((item: string) => item.includes(props.searchValue))))
onBeforeMount(async () => {
  await loadIcons(props.iconData.map((o: string) => `${props.collection}:${o}`))
})

function handleClick(item: any) {
  emits('click', item)
}

function fisrtLetterToUpperCase(str: string): string {
  return str.split('-').map(item => `${item[0].toUpperCase()}${item.slice(1)}`).join('')
}
</script>

<template>
  <ul class="grid grid-cols-[repeat(auto-fill,minmax(17.5rem,1fr))] b-t-1">
    <li
      v-for="(item, index) in data"
      :key="index"
      class="h-22.5 flex flex-col flex-wrap items-center b-b-1 b-x-1 items-center justify-center cursor-pointer hover:bg-[#f2f6fc]"
      @click="handleClick(item)"
    >
      <component :is="Icon" :icon="`${collection}:${item}`" />
      <span v-if="showTextFlag" class="mt-2 text-size-12px">{{ fisrtLetterToUpperCase(item) }}</span>
    </li>
  </ul>
</template>

<style scoped lang="scss"></style>
