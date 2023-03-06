<script setup>
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
</script>

<template>
  <n-data-table :columns="columns" :data="data" :bordered="false" />
</template>
