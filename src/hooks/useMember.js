import { computed } from 'vue'
import useCalendar from './useCalendar'
import { useMemberStore } from '../stores'

/**
 * rules: 0.当月休息6/7天； 1.昨晚晚班+第二天早班；2.连续休息2天要上早班
 */
export default function useMember() {
  const { getCalendar } = useCalendar()
  const memberStore = useMemberStore()

  // randomMember
  const randomMember = (day, type) => {
    const { members, restDays } = memberStore
    const member = members[Math.round(Math.random() * (members.length - 1))]

    console.log('randomMember: (day: %s)', day, member)

    if (!member) return

    // init
    if (member[type].length === 0) {
      member[type].push(day)
      memberStore.changeMember(member)
      return member
    }

    if (member[type].length > 0 && !member[type].includes(day)) {
      if (member[type].length < restDays) {
        member[type].push(day)
        memberStore.changeMember(member)
        return member
      }
    } else {
      return randomMember(day, type)
    }
  }

  // date
  const getCalendarDates = (calendar, index) => {
    const week = calendar.reduce((pre, current) => {
      pre[current.weekDayText] = current.day
      return pre
    }, {})

    return {
      ...week,
      index,
      type: 'calendar',
    }
  }

  // morning members
  const getMorningMembers = (calendar, index) => {
    return {
      type: 'morning',
    }
  }

  // afternoon members
  const getAfternoonMembers = (calendar, index) => {
    return {
      type: 'afternoon',
    }
  }

  // rest members
  const getRestMembers = (calendar, index) => {
    console.log('getRestMembers', index)

    const week = calendar.reduce((pre, current) => {
      const member = randomMember(current.day, 'rest')
      console.log(index, member)
      pre[current.weekDayText] = member?.name

      return pre
    }, {})

    return {
      ...week,
      index: '',
      type: 'rest',
    }
  }

  const getMembers = (calendar, index) => {
    const calendarDates = getCalendarDates(calendar, index)
    const morningMembers = getMorningMembers(calendar, index)
    const afternoonMembers = getAfternoonMembers(calendar, index)
    const restMembers = getRestMembers(calendar, index)

    return [calendarDates, morningMembers, afternoonMembers, restMembers]
  }

  const getMemberData = (timestamp) => {
    const data = []
    const calendarList = getCalendar(timestamp)
    // memberStore.$reset()

    for (let i = 0; i < 6; i++) {
      // line
      let cal = calendarList.slice(i * 7, (i + 1) * 7)
      const members = getMembers(cal, i)
      data.push(...members)
    }

    return data
  }

  return {
    getMemberData,
  }
}
