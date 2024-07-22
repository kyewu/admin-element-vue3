<script setup lang="ts">

</script>

<template>
  <el-dropdown trigger="click">
    <span class="el-dropdown-link">
      <Notification icon="ep:bell" />
    </span>
    <template #dropdown>
      <notice-message-list />
    </template>
  </el-dropdown>
</template>

<style scoped lang="scss"></style>
