<script setup>
import addMemberModal from './modal/AddMemberModal.vue'
import { useMemberStore } from '../stores'
import { NButton } from "naive-ui";

const showModal = ref(false)
const { members, addMember, changeMember, removeMember } = useMemberStore()

const createColumns = ({
  changeMember, removeMember
}) => {
  return [
    {
      title: '序号',
      key: 'no',
      render: (_, index) => {
        return index + 1
      }
    },
    {
      title: '姓名',
      key: 'name',
    },
    {
      title: '操作',
      key: 'actions',
      render(row) {
        return [h(
          NButton,
          {
            size: "small",
            onClick: () => changeMember(row.id)
          },
          { default: () => "Edit" }
        ),
        h(
          NButton,
          {
            size: "small",
            onClick: () => removeMember(row.id)
          },
          { default: () => "Remove" }
        )];
      }
    },
  ]
}
const columns = createColumns({
  changeMember, removeMember
})

const onPositiveClick = (model) => {
  addMember(model.name)
  showModal.value = false
}
const onNegativeClick = () => {
  showModal.value = false
}
</script>

<template>
  <n-space class="top-space">
    <n-button @click="showModal = true" strong secondary round type="info">
      新建
    </n-button>
  </n-space>
  <n-data-table :columns="columns" :data="members" :bordered="false" />
  <add-member-modal v-model:show="showModal" positive-text="确认" negative-text="取消" @positive-click="onPositiveClick"
    @negative-click="onNegativeClick" />
</template>

<style lang="scss" scoped>
.top-space {
  padding-bottom: 10px;
}
</style>
