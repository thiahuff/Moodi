import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core"
import dayjs from "dayjs"
import React, { useState } from "react"
import { Log } from "../types"

import "./calendar.scss"
import LogFormContainer from "./log-form-container"

interface CalendarDay {
  className: string
  date: dayjs.Dayjs
  log_id?: string
}

const createCalendar = (date: dayjs.Dayjs, logs: Log[]): CalendarDay[][] => {
  const currentMonthDays: number = date.daysInMonth()

  const thisMonthsDatesArray: dayjs.Dayjs[] = Array.from(
    Array(currentMonthDays).keys()
  ).map((_, index) => date.set("date", index + 1))

  const leadingDays = getLeadingDays(date)
  const succeedingDays = getSucceedingDays(date)

  const combinedDates = [
    ...leadingDays,
    ...thisMonthsDatesArray,
    ...succeedingDays,
  ]

  const calendarArray: CalendarDay[] = combinedDates.map(date => {
    const log = logs.find(l => dayjs(l.date).isSame(date, "day"))

    if (!log) {
      return {
        className: "no-log-color",
        date,
      }
    }

    return {
      className: moodValueToColor(log.mood_value),
      date,
      log_id: log.log_id,
    }
  })

  return createWeeks(calendarArray)
}

const moodValueToColor = mood_value => {
  console.log(mood_value)
  if (mood_value == 1) return "dark-slate-blue"
  else if (mood_value <= 1.5) return "dark-moderate-blue"
  else if (mood_value <= 2) return "sapphire-blue"
  else if (mood_value <= 2.5) return "dark-blue"
  else if (mood_value <= 3) return "blue-munsell"
  else if (mood_value <= 3.5) return "dark-cyan"
  else if (mood_value <= 4) return "keppel"
  else if (mood_value <= 4.5) return "strong-cyan-lime"
  else if (mood_value <= 5) return "medium-aquamarine"
  else if (mood_value <= 5.5) return "soft-cyan-lime"
  else if (mood_value <= 6) return "light-green"
  else if (mood_value <= 6.5) return "soft-green"
  else if (mood_value <= 7) return "inchworm"
  else if (mood_value <= 7.5) return "soft-yellow"
  else if (mood_value <= 8) return "corn"
  else if (mood_value <= 8.5) return "sunshine-yellow"
  else if (mood_value <= 9) return "maize-crayola"
  else if (mood_value <= 9.5) return "soft-orange"
  else if (mood_value <= 10) return "sandy-brown"
}

const getLeadingDays = (date: dayjs.Dayjs): dayjs.Dayjs[] => {
  const leadingDays = date.startOf("month").day() // 0 -sunday => 6 saturday
  const previousMonth = date.subtract(1, "month") // dayjs object from current time -1 month
  const daysInPreviousMonth: number = previousMonth.daysInMonth() // count of days in previous month

  let result: dayjs.Dayjs[] = []

  for (let index = 0; index < leadingDays; index++) {
    result.push(
      previousMonth.set("date", daysInPreviousMonth - leadingDays + index)
    )
  }

  return result
}

const getSucceedingDays = (date: dayjs.Dayjs): dayjs.Dayjs[] => {
  const endDate = date.endOf("month").day() // 0 -sunday => 6 saturday
  const nextMonth = dayjs(date).add(1, "month")
  const daysInNextMonth: number = nextMonth.daysInMonth()

  let result: dayjs.Dayjs[] = []

  for (let index = 0; index < 6 - endDate; index++) {
    result.push(nextMonth.set("date", index + 1))
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

const Calendar = ({ logs, refreshLogs }) => {
  const now = dayjs()
  const weeks = createCalendar(now, logs)

  const [modalOpen, setModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)

  // handleOpen (date) => open modal + set selected date
  // handleClose => close modal, clear selected date

  const handleOpenModal = date => {
    setModalOpen(true)
    setSelectedDate(date)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setSelectedDate(null)
  }

  const afterSubmit = async () => {
    await refreshLogs()
    handleCloseModal()
  }

  return (
    <>
      <div className="calendar">
        <div className="calendar-month-title">{now.format("MMMM YYYY")}</div>
        {weeks.map((week, index) => {
          return (
            <div key={index} className="calendar-week">
              {week.map((day, index) => {
                return (
                  <div
                    className={`calendar-day ${day.className}`}
                    onClick={() => handleOpenModal(day.date)}
                  >
                    {day.date.format("DD")}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
      <Dialog open={modalOpen} onClose={handleCloseModal}>
        <DialogContent>
          <LogFormContainer date={selectedDate} afterSubmit={afterSubmit} />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Calendar
