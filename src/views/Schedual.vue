<script setup>
// https://www.naiveui.com/zh-CN/light/components/space
import useExcel from '../hooks/useExcel'
import useMember from '../hooks/useMember'
import { useMemberStore } from '../stores'

const tableRef = ref()
const data = ref([])
const timestamp = ref(Date.now())

const { exportExcel } = useExcel()
const { getMemberData } = useMember()
const memberStore = useMemberStore()
// const { restDays } = storeToRefs(memberStore)
const restDays = ref(memberStore.restDays)

const steps = ref([{
  target: '[data-target="guide-target-1"]',
  header: '提示1',
  content: '这里是新建按钮'
}, {
  target: '[data-target="guide-target-2"]',
  header: '提示2',
  content: '这里是菜单'
}, {
  target: '.router-link-exact-active',
  header: '提示3',
  content: '这里是菜单'
}, {
  target: '[data-target="guide-target-4"]',
  header: '提示4',
  content: '这里是菜单'
}])

const visible = ref(true)

watch(
  timestamp,
  (timestamp) => {
    console.log('watch', timestamp)
    data.value = getMemberData(timestamp)
  },
  { immediate: true }
)

// watch(
//   restDays,
//   (restDays) => {
//     console.log('watch', restDays)
//     memberStore.rest = restDays
//     data.value = getMemberData(timestamp.value)
//   },
//   { immediate: true }
// )

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

    <month-picker data-target="guide-target-1" v-model="timestamp" @change="onMonthChange" />

    <n-input-number v-model:value="restDays" style="width: 8rem;" :min="6" :max="10" button-placement="both" />

    <n-button data-target="guide-target-2" @click="exportExcel" round size="small" type="info">
      导出
    </n-button>
  </n-space>

  <n-data-table ref="tableRef" :single-line="false" :columns="columns" :data="data" :row-class-name="rowClassName" />

  <n-button data-target="guide-target-4" @click="exportExcel" round size="small" type="info">
    导出
  </n-button>

  <guide :steps="steps" v-model="visible" />
</template>

<style lang="scss" scoped>
$calendar-bg: rgba(24, 160, 88, 0.16);

.table-space {
  padding-bottom: 10px;
}

:deep(.calendar) {

  td {
    &:not(:first-child) {
      text-align: end;
    }

    background-color: $calendar-bg;
  }

  &:hover {

    &,
    >td {
      background-color: darken($calendar-bg, 15%) !important;
    }
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
