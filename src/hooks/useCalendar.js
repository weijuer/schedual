// https://date-fns.org/v2.29.3/docs/isToday
import { getDay, getDaysInMonth, isToday, isThisMonth } from 'date-fns/esm'

export default function useCalendar() {
  const getCalendar = (timestamp) => {
    const calendar = []
    // 一天时间
    const dayTime = 24 * 3600 * 1000
    // 当月第一天
    const tempDate = new Date(timestamp)
    const firstDay = new Date(tempDate.getFullYear(), tempDate.getMonth(), 1)
    // 第一天是周几
    const weekDay = firstDay.getDay() === 0 ? 7 : firstDay.getDay()
    // 用当前月份第一天减去周几前面几天，就是看见的日历的第一天
    const startDay = firstDay - (weekDay - 1) * dayTime
    // 我们统一用42天来显示当前显示日历
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDay + i * dayTime)
      const weekDayTexts = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
      const weekDay = date.getDay()

      calendar.push({
        date: date,
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate(),
        weekDay: weekDay,
        weekDayText: weekDayTexts[weekDay],
        isToday: isToday(date),
        isThisMonth: isThisMonth(date),
      })
    }
    return calendar
  }

  return { getCalendar }
}
