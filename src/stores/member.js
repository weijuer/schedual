import { defineStore, acceptHMRUpdate } from 'pinia'

export const useMemberStore = defineStore({
  id: 'member',
  state: () => ({
    username: '',
    rest: 7,
    memberList: [],
  }),
  getters: {
    restDays(state) {
      return state.rest
    },
    members(state) {
      return state.memberList
    },
  },
  actions: {
    addMember(name) {
      const member = {
        id: Date.now(),
        name,
        morning: [],
        afternoon: [],
        rest: [],
      }

      this.memberList.unshift(member)
    },
    changeMember(member) {
      this.memberList = this.memberList.map((item) => {
        if (item.id === member.id) {
          item = member
        }
        return item
      })
    },
    removeMember(id) {
      this.memberList = this.memberList.filter((member) => member.id !== id)
    },
    resetMonthMembers() {
      this.memberList = this.memberList.map((member) => ({
        ...member,
        morning: [],
        afternoon: [],
        rest: [],
      }))
    },
  },
  persist: {
    enabled: true,
    strategies: [
      { storage: sessionStorage, paths: ['username', 'rest'] },
      { storage: localStorage, paths: ['memberList'] },
    ],
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMemberStore, import.meta.hot))
}
