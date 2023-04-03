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
  position: {
    type: String,
    validate: () => [],
    default: 'top'
  },
  isFirst: Boolean,
  isLast: Boolean
})

const emit = defineEmits(['next', 'prev', 'skip'])

const guide = inject('guide')
console.log(guide.active)

const stepRef = ref()
const targetDOM = ref()
const isActive = computed(() => guide.target === props.target)
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

  console.log(elementRect)

  return {
    top: elementRect.top + scrollTop,
    left: elementRect.left + scrollLeft,
    right: elementRect.left + scrollLeft + elementRect.width,
    bottom: elementRect.top + scrollTop + elementRect.height,
  }
}

const stepStyle = computed(() => {

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
  } else {
    return null
  }
})

onMounted(() => {
  targetDOM.value = document.querySelector(props.target);
});

</script>

<template>
  <div class="w-step" :class="[position, { active: isActive }]" ref="stepRef" :style="stepStyle">
    <div class="w-step__header" v-if="$slots.header || header">
      <slot name="header">{{ header }}</slot>
    </div>

    <div v-if="$slots.content || content" class="w-step__content">
      <slot name="content">{{ content }}</slot>
    </div>

    <div class="w-step__actions" v-if="$slots.actions || actions">
      <slot name="actions">
        <a class="w-step__actions-btn" href="javascript:;" @click="skip()">跳过</a>
        <a class="w-step__actions-btn" href="javascript:;" @click="prev()">上一步</a>
        <a class="w-step__actions-btn" href="javascript:;" @click="next()">{{ nextText }}</a>
      </slot>
    </div>
  </div>
</template>

<style lang="scss">
$positions: top right bottom left;

@function opposite-position($position) {

  @if $position ==top {
    @return bottom
  }

  @if $position ==bottom {
    @return top
  }

  @if $position ==left {
    @return right
  }

  @if $position ==right {
    @return left
  }

}

@mixin tail($position) {
  $pos: opposite-position($position);

  content: '';
  display: inline-block;
  position: absolute;
  #{$pos}: 100%;

  @debug $position in (left right);

  @if $position in left right {
    top: 8px;
  }

  @if $position in top bottom {
    left: 8px;
  }

  border: 8px solid transparent;
  border-#{$pos}-color: #fff;
}

@mixin tailMaker($positions) {
  @each $pos in $positions {
    &.#{$pos} {
      &:after {
        @include tail($pos)
      }
    }
  }
}

.w-step {
  min-width: 120px;
  padding: 20px 14px;
  display: inline-block;
  position: fixed;
  z-index: 2021;
  font-size: 14px;
  line-height: 1.25;
  visibility: hidden;
  background: #fff;
  border: 1px dashed #eee;
  border-radius: 4px;
  transition: all .2ms linear;

  &.active {
    visibility: visible;
  }

  .w-step__header {
    font-weight: 600;
  }

  .w-step__actions {
    display: flex;
    justify-content: flex-end;

    .w-step__actions-btn {
      margin-right: 8px;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  @include tailMaker($positions)
}
</style>