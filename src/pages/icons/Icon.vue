<script setup lang="ts">
import { getIcon } from '@iconify/vue'

const { copy } = useClipboard()
function toSvgHtml(res: any): string {
  const { body, hFlip, height, left, rotate, top, vFlip, width } = res
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${left} ${top} ${width} ${height}" style="transform: rotate(${rotate}deg) scaleX(${hFlip ? -1 : 1}) scaleY(${vFlip ? -1 : 1});"><g>${body}</g></svg>`
}
const showTextFlag: Ref<boolean> = ref(true)
const copySvgFlag: Ref<boolean> = ref(false)
const searchValue: Ref<string> = ref('')
async function onClick(item: string) {
  let content = ''
  if (!copySvgFlag.value) {
    // copy str
    content = `<div class="i-ep:${item} w-4 h-4"></div>`
  }
  else {
    const iconData = await getIcon(`ep:${item}`)
    content = toSvgHtml(iconData)
  }
  copy(content)
  ElMessage.success('Copied')
}
</script>

<template>
  <div p-4>
    <div class="flex flex-col flex-nowrap items-end">
      <el-switch v-model="copySvgFlag" size="large" inactive-text="Copy icon code" active-text="Copy SVG content" />
      <el-input v-model="searchValue" class="w-full mb-5" placeholder="Search icon" />
    </div>
    <IconList :show-text-flag="showTextFlag" :search-value="searchValue" @click="onClick" />
  </div>
</template>

<style scoped lang="scss">
</style>
