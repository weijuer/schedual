<script setup>
const props = defineProps({
  source: Object,
})
const emit = defineEmits(['negative-click', 'positive-click'])

const formRef = ref()
const defaultValueRef = () => ({
  name: null,
  extra: '',
})

const attrs = useAttrs()
const state = reactive({
  title: computed(() => (props.source.id ? '编辑' : '新建')),
  formModel: defaultValueRef(),
})

const rules = {
  name: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入姓名',
  },
}

function resetFields() {
  formRef.value.restoreValidation()
  state.formModel = Object.assign(state.formModel, defaultValueRef())
}

watch(
  () => attrs.show,
  (show) => {
    if (formRef.value) {
      resetFields()
    }
  }
)

const onPositiveHandle = (e) => {
  e.preventDefault()
  formRef.value?.validate((errors) => {
    if (!errors) {
      emit('positive-click', state.formModel)
    } else {
      console.log(errors)
    }
  })
}
</script>

<template>
  <n-modal
    v-bind="$attrs"
    :show-icon="false"
    preset="dialog"
    :title="state.title"
  >
    <n-form
      class="w-form"
      ref="formRef"
      :model="state.formModel"
      :rules="rules"
      label-placement="left"
      :label-width="80"
      require-mark-placement="right-hanging"
      size="medium"
    >
      <n-form-item label="姓名" path="name">
        <n-input
          v-model:value="state.formModel.name"
          placeholder="请输入姓名"
        />
      </n-form-item>
      <n-form-item label="备注" path="extra">
        <n-input
          type="textarea"
          v-model:value="state.formModel.extra"
          placeholder="请输入备注"
        />
      </n-form-item>
    </n-form>

    <template #action>
      <n-button @click="emit('negative-click')">取消</n-button>
      <n-button @click="onPositiveHandle" type="info"> 确认 </n-button>
    </template>
  </n-modal>
</template>

<style lang="scss" scoped>
.w-form {
  padding: 1rem 0;
}
</style>
