<script setup>
import addMemberModal from './modal/AddMemberModal.vue'
import { useMemberStore } from '../stores'
import { NButton } from 'naive-ui'

const showModal = ref(false)
const source = ref({})
const memberStore = useMemberStore()

const createColumns = ({ onEditMember, onRemoveMember }) => {
  return [
    {
      title: '序号',
      key: 'no',
      render: (_, index) => {
        return index + 1
      },
    },
    {
      title: '姓名',
      key: 'name',
    },
    {
      title: '操作',
      key: 'actions',
      render(row) {
        return [
          h(
            NButton,
            {
              size: 'small',
              onClick: () => onEditMember(row),
            },
            { default: () => 'Edit' }
          ),
          h(
            NButton,
            {
              size: 'small',
              onClick: () => onRemoveMember(row.id),
            },
            { default: () => 'Remove' }
          ),
        ]
      },
    },
  ]
}

const { changeMember, removeMember } = memberStore

const onEditMember = (row) => {
  showModal.value = true
  source.value = row
}

const onRemoveMember = (row) => {
  memberStore.removeMember(row.id)
}

const columns = createColumns({
  onEditMember,
  onRemoveMember,
})

const onPositiveClick = (model) => {
  memberStore.addMember(model.name)
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
  <n-data-table
    :columns="columns"
    :data="memberStore.members"
    :bordered="false"
  />
  <add-member-modal
    :source="source"
    v-model:show="showModal"
    positive-text="确认"
    negative-text="取消"
    @positive-click="onPositiveClick"
    @negative-click="onNegativeClick"
  />
</template>

<style lang="scss" scoped>
.top-space {
  padding-bottom: 10px;
}
</style>
