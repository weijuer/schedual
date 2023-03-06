<script setup>
const props = defineProps({})
const emit = defineEmits(['positive-click'])

const formRef = ref()
const model = ref({
  name: null,
})

const state = reactive({
  rules: {
    name: {
      required: true,
      trigger: ['blur', 'input'],
      message: '请输入姓名',
    },
  },
})

const onPositiveHandle = () => {
  formRef.value?.validate((errors) => {
    if (!errors) {
      emit('positive-click', model.value)
      console.log('Valid')
      // message.success('Valid')
    } else {
      console.log(errors)
      // message.error('Invalid')
    }
  })
}
</script>

<template>
  <n-modal
    v-bind="$attrs"
    v-on="$listeners"
    @positive-click="onPositiveHandle"
    preset="dialog"
    title="新建"
  >
    <n-form
      ref="formRef"
      :model="model"
      :rules="state.rules"
      label-placement="left"
      label-width="auto"
      require-mark-placement="right-hanging"
      size="medium"
    >
      <n-form-item label="姓名" path="name">
        <n-input v-model:value="model.name" placeholder="请输入姓名" />
      </n-form-item>
    </n-form>
  </n-modal>
</template>
