<!-- eslint-disable no-console -->
<script setup lang="ts">
import { loadLocaleMessages } from '@/modules/i18n'

const locale = ref('en')

watch(locale, () => {
  loadLocaleMessages(locale.value)
})
</script>

<template>
  <div>
    <select v-model="locale">
      <option value="zh-CN">
        中文
      </option>
      <option value="en">
        English
      </option>
    </select>
  </div>
  {{ $t('Hello') }}
  <FullScreen tag="i" icon-class="text-xl" />
  <DarkModeToggle :dark="false" />
  <WebIcon name="xiaoxi-zhihui" />
  <SvgIcon name="xing" class="text-4 text-red" />
  <IconList />
</template>

<route lang="yaml">
meta:
  layout: home
</route>
