import dayjs from "dayjs"
import React from "react"

import "./calendar.css"

const createCalendar = () => {
  const now = dayjs()
  const currentMonthDays: number = now.daysInMonth()
  const daysArray: number[] = []

  const thisMonthsDatesArray: number[] = Array.from(
    Array(currentMonthDays).keys()
  ).map((_, index) => index + 1)

  const leadingDays = getLeadingDays(now)
  const succeedingDays = getSucceedingDays(now)

  return createWeeks([
    ...leadingDays,
    ...thisMonthsDatesArray,
    ...succeedingDays,
  ])
}

const getLeadingDays = (date: dayjs.Dayjs): number[] => {
  const leadingDays = date.startOf("month").day() // 0 -sunday => 6 saturday
  const daysInPreviousMonth = dayjs(date).subtract(1, "month").daysInMonth()

  let result: number[] = []

  for (let index = 0; index < leadingDays; index++) {
    result.push(daysInPreviousMonth - leadingDays + index)
  }

  return result
}

const getSucceedingDays = (date: dayjs.Dayjs): number[] => {
  const endDate = date.endOf("month").day() // 0 -sunday => 6 saturday
  const nextMonth = dayjs(date).add(1, "month").daysInMonth()

  let result: number[] = []

  for (let index = 0; index < 6 - endDate; index++) {
    result.push(index + 1)
  }

  return result
}

const createWeeks = allDays => {
  let result = []

  for (let index = 0; index < allDays.length / 7; index++) {
    result.push(allDays.slice(7 * index, 7 * index + 7))
  }

  return result
}

const Calendar = ({ logs }) => {
  const weeks = createCalendar()

  return (
    <div className="calendar">
      {weeks.map((week, index) => {
        return (
          <div key={index} className="calendar-week">
            {week.map((day, index) => {
              return <div className="calendar-day">{day}</div>
            })}
          </div>
        )
      })}
    </div>
  )
}

export default Calendar
