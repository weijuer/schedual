import { computed } from 'vue'
import useCalendar from './useCalendar'
import { useMemberStore } from '../stores'
import { sample, sampleSize } from '../utils'

/**
 * rules: 0.当月休息6/7天； 1.昨晚晚班+第二天早班；2.连续休息2天要上早班
 */
export default function useMember() {
  const { getCalendar } = useCalendar()
  const memberStore = useMemberStore()

  const uniqueMember = (member, day, type) => {
    // init
    if (member[type].length === 0) {
      member[type].push(day)
      memberStore.changeMember(member)
      return member
    } else if (!member[type].includes(day)) {
      if (member[type].length < restDays) {
        member[type].push(day)
        memberStore.changeMember(member)
        return member
      } else {
        const _member = sample(members)
        return uniqueMember(_member)
        // return randomMember(day, type)
      }
    }
  }

  // randomMembers
  const randomMembers = (day, type, num = 2) => {
    const { members, restDays } = memberStore
    const memberList = sampleSize(members, num)

    console.log('randomMember: (day: %s)', day, type, memberList)
    // check member
    const isUnique = memberList.every(member => {
      return (member[type].length === 0 || !member[type].includes(day) && member[type].length < restDays)
    })
    if (isUnique) {
      // record
      memberList.map(member => {
        member[type].push(day)
        memberStore.changeMember(member)
      })
      return memberList
    }
    return randomMembers(day, type, num)
  }

  // date
  const getCalendarDates = (calendar, index) => {
    const week = calendar.reduce(
      (pre, { isCurrentMonth, weekDayText, day }) => {
        pre[weekDayText] = isCurrentMonth ? day : ''
        return pre
      },
      {}
    )

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

    const week = calendar.reduce(
      (pre, { isCurrentMonth, weekDayText, day }) => {
        if (isCurrentMonth) {
          const members = randomMembers(day, 'rest', 2)
          console.log(index, members)
          pre[weekDayText] = members.map(member => member.name).join(',')
        }

        return pre
      },
      {}
    )

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
    memberStore.resetMonthMembers()

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
