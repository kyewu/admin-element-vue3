<script setup lang="tsx">
const props = defineProps({ dark: Boolean })

const emits = defineEmits(['change'])

const Moon = () => <i class="i-prime:moon text-3xl"></i>
const Sun = () => <i class="i-octicon:sun-24 text-3xl"></i>

const isDark = useStorage('dark-mode-flag', props.dark)
const preferredDark = usePreferredDark()

onMounted(() => {
  if (typeof isDark.value === 'undefined' && !props.dark) {
    toggleMode(preferredDark.value)
    isDark.value = preferredDark.value
  }
})

function toggleMode(flag: boolean): void {
  if (flag)
    document.documentElement.classList.add('dark')
  else
    document.documentElement.classList.remove('dark')
}

watch(
  [isDark],
  () => {
    nextTick(() => {
      toggleMode(isDark.value)
      emits('change', isDark)
    })
  },
  {
    immediate: true,
  },
)
// 跟随系统
watch([preferredDark], () => {
  nextTick(() => {
    toggleMode(preferredDark.value)
    isDark.value = preferredDark.value
  })
})
</script>

<template>
  <el-switch
    v-model="isDark" style="--el-switch-on-color: #333" :active-action-icon="Moon" :inactive-action-icon="Sun"
    size="large"
  />
</template>

<style scoped lang="scss"></style>
