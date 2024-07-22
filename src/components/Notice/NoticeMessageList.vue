<script setup lang="ts">
const actions = ref([
  {
    icon: 'ep:setting',
    title: 'Pre',
  },
  {
    icon: 'ep:arrow-down-bold',
    title: 'Next',
  },
])
</script>

<template>
  <el-tabs>
    <el-tab-pane label="User" name="first">
      <ul>
        <li>
          <el-row>
            <el-col :span="4" align="middle">
              <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
            </el-col>
            <el-col :span="20" class="px-3">
              <!-- message -->
              <el-row align="middle" class="flex-nowrap">
                <!-- message title -->
                <div>title</div>
                <!-- message tag -->
                <el-tag class="ml-2" effect="dark" size="small">
                  sdf
                </el-tag>
              </el-row>
              <!-- message content -->
              <el-row>
                <div>content</div>
              </el-row>
              <!-- message time -->
              <el-row>
                <div>time</div>
              </el-row>
            </el-col>
          </el-row>
        </li>
      </ul>
    </el-tab-pane>
  </el-tabs>
  <!-- buttons -->
  <div class="flex w-full justify-around border-t">
    <div v-for="action in actions" :key="action.title" class="flex-1 flex flex-nowrap items-center px-2 pb-2 cursor-pointer">
      <Iconify :icon="action.icon" />
      <span class="pl-2px">{{ action.title }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
