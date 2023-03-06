<script setup>
// https://www.naiveui.com/zh-CN/light/components/space
import { computed, ref, watch } from 'vue'
import useExcel from '../hooks/useExcel'
import useMember from '../hooks/useMember'

const tableRef = ref()
const data = ref([])
const timestamp = ref(Date.now())
const members = ref(['张三', '李四', '王五', '赵六'])

const onCreate = (label) => label

const { exportExcel } = useExcel()
const { getMemberData } = useMember(members.value)

watch(
  timestamp,
  (timestamp) => {
    console.log('watch', timestamp)
    data.value = getMemberData(timestamp)
  },
  { immediate: true }
)

const onMonthChange = (date) => {
  console.log('onMonthChange', date)
}

const createColumns = () => {
  return [
    {
      title: '___ /___',
      key: 'index',
      render: (row) => {
        const { type } = row
        switch (type) {
          case 'calendar':
            return `第${row.index + 1}周`
          case 'morning':
            return '早班'
          case 'afternoon':
            return '晚班'
          case 'rest':
            return '休息'
        }
      },
    },
    {
      title: '周一',
      key: 'mon',
    },
    {
      title: '周二',
      key: 'tue',
    },
    {
      title: '周三',
      key: 'wed',
    },
    {
      title: '周四',
      key: 'thu',
    },
    {
      title: '周五',
      key: 'fri',
    },
    {
      title: '周六',
      key: 'sat',
    },
    {
      title: '周日',
      key: 'sun',
    },
  ]
}

const columns = createColumns()

const rowClassName = (row) => {
  if (row.type === 'calendar') {
    return 'calendar'
  }
}
</script>

<template>
  <n-space class="table-space" justify="space-between">
    <!-- <n-dynamic-tags v-model:value="members" @create="onCreate" /> -->

    <month-picker v-model="timestamp" @change="onMonthChange" />

    <n-button @click="exportExcel" round size="small" type="info">
      导出
    </n-button>
  </n-space>

  <n-data-table
    ref="tableRef"
    :single-line="false"
    :columns="columns"
    :data="data"
    :row-class-name="rowClassName"
  />
</template>

<style lang="scss" scoped>
.table-space {
  padding-bottom: 10px;
}

:deep(.calendar td) {
  &:not(:first-child) {
    text-align: end;
  }

  // background-color: rgba(24, 160, 88, 0.16);

  &:hover {
    // background-color: darken(rgba(21, 139, 76, 0.16), 15);
  }
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
</style>
