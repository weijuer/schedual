import { defineStore } from 'pinia';

export const useMemberStore = defineStore({
  id: 'member',
  state: () => ({
    memberList: [],
  }),
  getters: {
    members: (state) => {
      return state.memberList;
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
    removeMember(id) {
      this.memberList = this.memberList.filter(member => member.id !== id)
    }
  },
  persist: {
    enabled: true,
  },
});
