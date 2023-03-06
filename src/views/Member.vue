<script setup>
import addMemberModal from './modal/AddMemberModal.vue'
const showModal = ref(false)

const createColumns = () => {
  return [
    {
      title: '序号',
      key: 'no',
    },
    {
      title: '姓名',
      key: 'name',
    },
    {
      title: '操作',
      key: 'action',
    },
  ]
}

const columns = createColumns()
const data = []

const onPositiveClick = () => {}
const onNegativeClick = () => {}
</script>

<template>
  <n-space class="top-space">
    <n-button @click="showModal = true"> 新建 </n-button>
  </n-space>
  <n-data-table :columns="columns" :data="data" :bordered="false" />
  <add-member-modal
    v-model:show="showModal"
    positive-text="确认"
    negative-text="取消"
    @positive-click="onPositiveClick"
    @negative-click="onNegativeClick"
  />
</template>

<style lang="scss" scoped>
.top-space {
  padding-bottom: 10px;
}
</style>
