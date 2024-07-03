<script setup lang="ts">
import { Icon, loadIcons } from '@iconify/vue'
import iconDefaultData from '@/components/icon-ep.json'
import type { IconListType } from '@/components/types'

const props = withDefaults(defineProps<IconListType>(), {
  collection: 'ep',
  iconData: () => iconDefaultData,
  showTextFlag: false,
})
const emits = defineEmits(['click'])
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
  <ul class="grid sm-grid-cols-7 grid-cols-4 b-t-1">
    <li
      v-for="(item, index) in iconData"
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
