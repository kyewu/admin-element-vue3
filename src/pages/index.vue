<script setup lang="ts">

</script>

<template>
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
