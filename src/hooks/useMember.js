import { computed } from 'vue'
import useCalendar from './useCalendar'

/**
 * rules: 0.当月休息6/7天； 1.昨晚晚班+第二天早班；2.连续休息2天要上早班
 */
export default function useMember(members) {
  const { getCalendar } = useCalendar()

  const finalMembers = computed(() =>
    members.map((member, index) => {
      return {
        id: index,
        name: member,
        morning: [],
        afternoon: [],
        rest: [],
      }
    })
  )

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
    const week = calendar.reduce((pre, current) => {
      pre[current.weekDayText] = finalMembers.value.map((member) => {
        if (member.rest.length <= 7) {
          return member.name
        }
      })
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
