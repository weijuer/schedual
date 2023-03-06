<script setup>
// https://blog.csdn.net/qq_39055970/article/details/123125129
import { ref, reactive } from 'vue'
// https://xicons.org/#/
import {
  ArrowCircleLeft12Regular,
  ArrowCircleRight12Regular,
  CalendarToday24Regular,
} from '@vicons/fluent'

const props = defineProps({
  modelValue: {
    type: Number,
    default: Date.now(),
  },
})

const emit = defineEmits(['change', 'update:modelValue'])

const today = new Date(props.modelValue)
const state = reactive({
  date: {
    year: today.getFullYear(),
    month: today.getMonth(),
  },
})

const month = computed(() =>
  state.date.month + 1 > 9 ? state.date.month + 1 : '0' + (state.date.month + 1)
)

const addMonth = () => {
  const { year, month } = state.date

  if (month < 11) {
    state.date.month = month + 1
  } else {
    state.date.month = 0
    state.date.year = year + 1
  }
  emit('change', state.date)
  update()
}

const reduceMonth = () => {
  const { year, month } = state.date

  if (month > 0) {
    state.date.month = month - 1
  } else {
    state.date.month = 11
    state.date.year = year - 1
  }
  emit('change', state.date)
  update()
}

const thisMonth = () => {
  const today = new Date()
  state.date.year = today.getFullYear()
  state.date.month = today.getMonth()
  emit('change', state.date)
  update()
}

const update = () => {
  const { year, month } = state.date
  const date = new Date(year, month, 1)
  emit('update:modelValue', date.getTime())
}
</script>

<template>
  <div class="month-picker">
    <n-icon class="icon-btn" size="26" @click="reduceMonth()" title="上一月">
      <ArrowCircleLeft12Regular />
    </n-icon>
    <span class="month"> {{ state.date.year }}年{{ month }}月 </span>
    <n-icon class="icon-btn" size="26" @click="addMonth()" title="下一月">
      <ArrowCircleRight12Regular />
    </n-icon>
    <n-icon class="icon-btn" size="26" @click="thisMonth()" title="当月">
      <CalendarToday24Regular />
    </n-icon>
  </div>
</template>

<style lang="scss" scoped>
.month-picker {
  display: flex;
  align-items: center;

  .icon-btn {
    cursor: pointer;
    will-change: transform;
    transition: transform 200ms;
    &:active {
      transform: scale(0.8);
    }
  }

  .month {
    padding: 0 6px;
  }
}
</style>
