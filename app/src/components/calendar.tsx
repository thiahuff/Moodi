import dayjs from "dayjs"
import React from "react"

const getLeadingDays = (date: dayjs.Dayjs): number[] => {
  const startDay = date.day() //0 -sunday => 6 saturday
  const previousMonth = date.subtract(1, "month")

  return []
}

const getSucceedingDays = (date: dayjs.Dayjs): number[] => {
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
