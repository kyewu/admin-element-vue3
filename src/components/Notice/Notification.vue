<script setup lang="ts">
import type { BadgeProps } from 'element-plus'
import type { IconifyIcon } from '@iconify/vue'

interface Notification extends Partial<BadgeProps> {
  icon: string | IconifyIcon
  iconSize?: number
  iconColor?: string
  size?: number
  color?: string
}

withDefaults(defineProps<Notification>(), {
  icon: 'ep:bell',
  iconSize: 18,
  iconColor: '#333',
  size: 12,
  color: 'red',
})
</script>

<template>
  <el-badge
    :value="value"
    :style="{ '--el-badge-background-color': color ?? 'var(--el-color-danger)', '--self-el-badge-size': `${size}px` ?? 'var(--el-badge-font-size)' }"
  >
    <slot>
      <Iconify :icon="icon" :style="{ fontSize: `${iconSize}px`, color: iconColor }" class="cursor-pointer" />
    </slot>
  </el-badge>
</template>

<style scoped lang="scss">
$color: var(--el-badge-background-color);
$size: var(--self-el-badge-size);

:deep(.el-badge__content) {
  background: $color;
  font-size: $size;
}
</style>
