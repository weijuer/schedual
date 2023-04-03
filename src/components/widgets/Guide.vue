<script setup>

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    steps: {
        type: Array,
        default: () => []
    }
})
const emit = defineEmits(['update:modelValue'])

const visible = computed(() => props.modelValue)
const state = reactive({
    active: 0,
    isFirst: computed(() => state.active === 1),
    isLast: computed(() => state.active === props.steps.length),
    target: computed(() => props.steps[state.active].target),
})


const next = () => {
    if (state.active >= props.steps.length) {
        visible.value = false
        emit('update:modelValue', visible.value)
    } else {
        state.active++
        // this.updateTarget()
    }
}

const prev = () => {
    if (state.active == 1) return
    state.active--
    // this.updateTarget()
}

provide('guide', state)
</script>

<template>
    <section class="w-guide" v-show="visible">
        <div class="w-guide-overlay"></div>
        <div class="w-guide-target"></div>
        <div class="w-guide-steps">
            <slot>
                <step v-for="(step, index) of steps" :target="step.target" :header="step.header" :content="step.content"
                    :key="'step_' + index" @next="next()" @prev="prev()">
                </step>
            </slot>
        </div>
    </section>
</template>

<style scoped lang="scss">
.w-guide {

    .w-guide-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.4);
        z-index: 2020;
    }

    .w-guide-target {
        position: absolute;
        z-index: 2021;
        background: transparent;
        box-shadow: inset 0px 0px 2px 2px #4c4c4c;
        transition: all .3s ease-out;
    }
}
</style>
