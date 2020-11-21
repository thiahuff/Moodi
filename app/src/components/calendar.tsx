import dayjs from "dayjs"
import React from "react"

const getLeadingDays: number[] = (date: dayjs.Dayjs) => {
  const startDay = date.day() //0
  const previousMonth = date.subtract(1, "month")

  return null
}

const getSucceedingDays: number[] = (date: dayjs.Dayjs) => {
  const nextMonth = date.add(1, "month")

  return []
}

const Calendar = () => {
  const now = dayjs()
  const currentMonthDays: number = now.daysInMonth()
  const daysArray: number[] = []

  const thisMonthsDatesArray: number[] = Array.from(
    Array(currentMonthDays).keys()
  ).map((_, index) => index + 1)

  return thisMonthsDatesArray.map((date, index) => {
    return <div key={index}>{date}</div>
  })
}

export default Calendar
