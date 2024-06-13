<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>

<template>
  <el-row class="mb-4">
    <el-button type="primary">
      按钮
    </el-button>
  </el-row>
  <Icon class="text-3xl text-red cursor-pointer" icon="mdi-light:home" />
  <RouterView />
</template>

<style lang="scss" scoped></style>
