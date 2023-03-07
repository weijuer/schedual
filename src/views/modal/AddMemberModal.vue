<script setup>
const props = defineProps({})
const emit = defineEmits(['negative-click', 'positive-click'])

const formRef = ref()
const formModel = reactive({
  name: null,
})

const rules = {
  name: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入姓名',
  },
}

const onPositiveHandle = (e) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      emit('positive-click', formModel.value)
      formModel.value.name = ''
      console.log('Valid')
    } else {
      console.log(errors)
    }
  })
}
</script>

<template>
  <n-modal v-bind="$attrs" :show-icon="false" preset="dialog" title="新建">
    <n-form class="w-form" ref="formRef" :model="formModel" :rules="rules" label-placement="left" :label-width="80"
      require-mark-placement="right-hanging" size="medium">
      <n-form-item label="姓名" path="name">
        <n-input v-model:value="formModel.name" placeholder="请输入姓名" />
      </n-form-item>
      <n-form-item label="备注" path="extra">
        <n-input type="textarea" v-model:value="formModel.extra" placeholder="请输入备注" />
      </n-form-item>
    </n-form>

    <template #action>
      <n-button @click="emit('negative-click')">取消</n-button>
      <n-button @click="onPositiveHandle" type="info">
        确认
      </n-button>
    </template>
  </n-modal>
</template>

<style lang="scss" scoped>
.w-form {
  padding: 1rem 0;
}
</style>
