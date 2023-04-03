import { defineStore, acceptHMRUpdate } from 'pinia'

export const useGuideStore = defineStore({
  id: 'guide',
  state: () => ({
    visible: false,
    current: '',
    steps: [],
  }),
  actions: {
    setVisble(visible) {
      this.visible = visible
    },
    setSteps(steps) {
      this.steps = steps
    },
  },
  persist: {
    enabled: true,
    strategies: [
      { storage: localStorage, paths: ['memberList'] },
    ],
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGuideStore, import.meta.hot))
}
