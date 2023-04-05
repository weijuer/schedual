<script setup>

const props = defineProps({
  target: String,
  header: {
    type: [String, Object]
  },
  content: {
    type: [String, Object]
  },
  actions: {
    type: [Boolean, Object],
    default: true
  },
  // 角标位置 top✔ | left | right | bottom
  direction: {
    type: String,
    validator(value) {
      return ['bottom', 'top', 'left', 'right'].indexOf(value) !== -1;
    },
    default: 'top'
  },
  isFirst: Boolean,
  isLast: Boolean
})

const emit = defineEmits(['next', 'prev', 'skip'])

const guide = inject('guide')

console.log('guide step', guide)

const stepRef = ref()
const targetDOM = ref()
// const isActive = computed(() => guide.step.value.target === props.target)
const nextText = computed(() => guide.isLast ? '完成' : '下一步')

const next = () => emit('next')
const prev = () => emit('prev')
const skip = () => emit('skip')

const getCalculatedPosition = () => {
  const body = document.body;
  const documentElement = document.documentElement;

  const scrollTop = window.pageYOffset || documentElement.scrollTop || body.scrollTop;
  const scrollLeft = window.pageXOffset || documentElement.scrollLeft || body.scrollLeft;
  const elementRect = targetDOM.value.getBoundingClientRect();

  return {
    top: elementRect.top + scrollTop,
    left: elementRect.left + scrollLeft,
    right: elementRect.left + scrollLeft + elementRect.width,
    bottom: elementRect.top + scrollTop + elementRect.height,
  }
}

const stepStyle = computed(() => {

  targetDOM.value = document.querySelector(props.target);

  if (targetDOM.value) {
    // 偏移量
    const offset = 10
    // 目标元素坐标
    const { bottom: targetBottom, left: targetLeft } = getCalculatedPosition()
    // 当前step元素坐标
    const { height: stepHeight } = stepRef.value.getBoundingClientRect()

    console.log('stepStyle', targetLeft, stepHeight)

    const top = `${targetBottom + offset}px`
    const left = `${targetLeft + offset}px`

    return {
      top: top,
      left: left
    }
  }
})
</script>

<template>
  <div class="w-step" :class="[direction]" ref="stepRef" :style="stepStyle">

    <slot name="header">
      <div class="w-step__header" v-if="header" v-html="header"></div>
    </slot>
    <slot name="content">
      <div v-if="content" class="w-step__content" v-html="content"></div>
    </slot>

    <slot name="actions">
      <div class="w-step__actions">
        <a class="w-step__actions-btn" href="javascript:;" @click="skip()">跳过</a>
        <a class="w-step__actions-btn" v-show="!props.isFirst" href="javascript:;" @click="prev()">上一步</a>
        <a class="w-step__actions-btn" href="javascript:;" @click="next()">{{ nextText }}</a>
      </div>
    </slot>
  </div>
</template>