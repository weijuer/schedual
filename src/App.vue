<script setup>
// https://www.naiveui.com/zh-CN/light/components/space
import { ref, watch } from 'vue'
// https://date-fns.org/v2.29.3/docs/isToday
import { getDay, getDaysInMonth, isToday } from 'date-fns/esm'
import * as XLSX from 'xlsx'

const timestamp = ref(Date.now())
const members = ref(['张三', '李四', '王五', '赵六'])

const onCreate = (label) => label

const handleUpdateValue = (_, { year, month, date }) => {
  console.log(`${year}-${month}-${date}`)
}

watch(timestamp, (timestamp) => {
  console.log('watch', timestamp)
  // createData()
})

const onMonthChange = (date) => {
  console.log('onMonthChange', date)
}

const createColumns = () => {
  return [
    {
      title: '___ /___',
      key: 'index',
      render: (row, index) => {
        // return index % 2 === 0 ? '早班' : '晚班'
        if (row.children) {
          return `第${index + 1}周`
        } else {
          return row.index === 0 ? '早班' : '晚班'
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

const getCalendar = computed(() => {
  const calendar = []
  // 一天时间
  const dayTime = 24 * 3600 * 1000
  // 当月第一天
  const firstDay = new Date(timestamp.value)
  console.log('data', firstDay)
  // 第一天是周几
  const weekDay = firstDay.getDay() === 0 ? 7 : firstDay.getDay()
  // 用当前月份第一天减去周几前面几天，就是看见的日历的第一天
  const startDay = firstDay - (weekDay - 1) * dayTime
  // 我们统一用42天来显示当前显示日历
  for (let i = 0; i < 42; i++) {
    const date = new Date(startDay + i * dayTime)
    calendar.push({
      date: date,
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDate(),
      isToday: isToday(date),
    })
  }
  return calendar
})

const data = computed(() => {
  const days = getDaysInMonth(timestamp.value)
  const day = getDay(timestamp.value)
  const calendar = getCalendar.value
  console.log('createData', days, day, calendar)
  const data = []

  for (let i = 0; i < 6; i++) {
    let cal = calendar.slice(i * 7, (i + 1) * 7)
    const calendar = {
      index: '-',
      mon: cal[0].day,
      tue: cal[1].day,
      wed: cal[2].day,
      thu: cal[3].day,
      fri: cal[4].day,
      sat: cal[5].day,
      sun: cal[6].day,
      type: 'calendar',
    }

    const morningMembers = {}

    const afternoonMembers = {}

    data.push([...calendar, ...morningMembers, ...afternoonMembers])
  }

  return data
})

const exportXlsx = () => {
  // 创建工作表
  const bookData = XLSX.utils.json_to_sheet(data.value)
  // 创建工作簿
  const wb = XLSX.utils.book_new()
  // 将工作表放入工作簿中
  XLSX.utils.book_append_sheet(wb, bookData, 'data')
  // 生成文件并下载
  XLSX.writeFile(wb, 'test.xlsx')
}

const columns = createColumns()
// const data = createData()

console.log(data)
</script>

<template>
  <n-layout has-sider>
    <n-layout-sider
      collapse-mode="transform"
      :collapsed-width="120"
      :width="240"
      show-trigger="bar"
      content-style="padding: 24px;"
      bordered
    >
      <!-- <n-h2>排班表</n-h2> -->
    </n-layout-sider>
    <n-layout-content content-style="padding: 24px;">
      <n-space justify="space-between">
        <!-- <n-dynamic-tags v-model:value="members" @create="onCreate" /> -->

        <!-- <n-date-picker v-model:value="month" type="month" /> -->

        <month-picker v-model="timestamp" @change="onMonthChange" />

        <n-button @click="exportXlsx" tertiary round type="info">
          导出
        </n-button>
      </n-space>

      <!-- <n-calendar
        v-model:value="value"
        #="{ year, month, date }"
        @update:value="handleUpdateValue"
      >
        <span>{{ year }}-{{ month }}-{{ date }}</span>
        <n-tag v-for="member in members" :key="member" size="large" round>
          {{ member }}
        </n-tag>
      </n-calendar> -->

      <n-data-table
        :single-line="false"
        :columns="columns"
        :data="data"
        default-expand-all
      />
    </n-layout-content>
  </n-layout>
</template>

<style scoped>
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
