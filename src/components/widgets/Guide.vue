<script setup>

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    steps: {
        type: Array,
        default: () => []
    },
    mask: {
        type: Boolean,
        default: true
    },
    direction: {
        type: String,
        validator(value) {
            return ['bottom', 'top', 'left', 'right'].indexOf(value) !== -1;
        },
        default: 'top'
    }
})

const emit = defineEmits(['update:modelValue'])

const state = reactive({
    active: 0,
    isFirst: computed(() => state.active === 0),
    isLast: computed(() => state.active === props.steps.length - 1),
    step: computed(() => props.steps[state.active])
})

console.log('guide state', state.isFirst)

const targetStyle = computed(() => {

    const offset = 10

    const targetDOM = document.querySelector(state.step?.target)
    if (targetDOM) {
        // 
        targetDOM.setAttribute('data-target-highlighted', '')

        // 目标元素坐标
        const { top, left, right, bottom, width, height } = targetDOM.getBoundingClientRect()

        return {
            top: `${top - offset * 0.5}px`,
            left: `${left - offset * 0.5}px`,
            width: `${width + offset}px`,
            height: `${height + offset}px`,
            // clip: `rect(${top}px, ${right}px, ${bottom}px, ${left}px)`
        }
    }
})

const next = () => {
    if (state.active >= props.steps.length - 1) {
        emit('update:modelValue', false)
    } else {
        state.active++
    }
}

const prev = () => {
    if (state.active === 0) return
    state.active--
}

const skip = () => {
    emit('update:modelValue', false)
}

provide('guide', state)
</script>

<template>
    <section class="w-guide" v-show="props.modelValue">
        <div v-if="mask" class="w-guide-overlay"></div>
        <div class="w-guide-target" :style="targetStyle"></div>
        <div class="w-guide-step">
            <transition name="fade">
                <step v-bind="state.step" :direction="direction" @skip="skip()" @next="next()" @prev="prev()">
                </step>
            </transition>
        </div>
    </section>
</template>

<style lang="scss" src="./guide.scss" /> 
