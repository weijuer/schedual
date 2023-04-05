<script setup>
import addMemberModal from './modal/AddMemberModal.vue'
import { useMemberStore, useGuideStore } from '../stores'
import { NButton } from 'naive-ui'

const showModal = ref(false)
const source = ref({})
const memberStore = useMemberStore()
const guideStore = useGuideStore()

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
              onClick: () => onRemoveMember(row),
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

const onAdd = () => {
  source.value = {}
  showModal.value = true
}

const onPositiveClick = (model) => {
  memberStore.addMember(model.name)
  showModal.value = false
}
const onNegativeClick = () => {
  showModal.value = false
}

const steps = [{
  target: '[data-target="guide-target"]',
  header: '提示',
  content: '这里是新建按钮'
}, {
  target: '.router-link-exact-active',
  header: '提示2',
  content: '这里是菜单'
}]

onMounted(() => {
  guideStore.setSteps(steps)
  guideStore.setVisble(true)
})
</script>

<template>
  <n-space class="top-space">
    <n-button data-target="guide-target" @click="onAdd" strong secondary round type="info">
      新建
    </n-button>
  </n-space>
  <n-data-table :columns="columns" :data="memberStore.members" :bordered="false" />
  <add-member-modal :source="source" v-model:show="showModal" positive-text="确认" negative-text="取消"
    @positive-click="onPositiveClick" @negative-click="onNegativeClick" />
</template>

<style lang="scss" scoped>
.top-space {
  padding-bottom: 10px;
}
</style>
