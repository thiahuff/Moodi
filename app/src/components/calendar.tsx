import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core"
import dayjs from "dayjs"
import React, { useState } from "react"
import { Log } from "../types"
import LogFormContainer from "./log-form-container"
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft"
import ArrowRightIcon from "@material-ui/icons/ArrowRight"
import { DatePicker, LocalizationProvider } from "@material-ui/pickers"
import DayJsUtils from "@material-ui/pickers/adapter/dayjs"

import "./calendar.scss"

interface CalendarDay {
  className: string
  date: dayjs.Dayjs
  log_id?: string
}

export const createCalendar = (
  date: dayjs.Dayjs,
  logs: Log[]
): CalendarDay[][] => {
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
    const log = logs.find(l => date.startOf("day").isSame(l.date, "day"))

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

export const moodValueToColor = (mood_value: number) => {
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

export const getLeadingDays = (date: dayjs.Dayjs): dayjs.Dayjs[] => {
  const leadingDays = date.startOf("month").day() // 0 -sunday => 6 saturday
  const previousMonth = date.subtract(1, "month") // dayjs object from current time -1 month
  const daysInPreviousMonth: number = previousMonth.daysInMonth() // count of days in previous month

  let result: dayjs.Dayjs[] = []

  for (let index = 1; index <= leadingDays; index++) {
    result.push(
      previousMonth.set("date", daysInPreviousMonth - leadingDays + index)
    )
  }

  return result
}

export const getSucceedingDays = (date: dayjs.Dayjs): dayjs.Dayjs[] => {
  const endDate = date.endOf("month").day() // 0 -sunday => 6 saturday
  const nextMonth = dayjs(date).add(1, "month")
  const daysInNextMonth: number = nextMonth.daysInMonth()

  let result: dayjs.Dayjs[] = []

  for (let index = 0; index < 6 - endDate; index++) {
    result.push(nextMonth.set("date", index + 1))
  }

  return result
}

export const createWeeks = allDays => {
  let result = []

  for (let index = 0; index < allDays.length / 7; index++) {
    result.push(allDays.slice(7 * index, 7 * index + 7))
  }

  return result
}

const Calendar = ({ logs, refreshLogs }) => {
  const [monthValue, setMonthValue] = useState<dayjs.Dayjs>(
    dayjs().startOf("month")
  )
  const weeks = createCalendar(monthValue, logs)

  const [modalOpen, setModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)

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
      <LocalizationProvider dateAdapter={DayJsUtils}>
        <DatePicker
          openTo="month"
          views={["year", "month"]}
          label="Year and Month"
          value={monthValue}
          onChange={newValue => setMonthValue(newValue)}
          renderInput={props => (
            <TextField {...props} helperText="Select Month" />
          )}
        />
      </LocalizationProvider>
      <div className="calendar">
        <div className="calendar-month-title">
          <ArrowLeftIcon
            onClick={() => setMonthValue(monthValue.subtract(1, "month"))}
            style={{ cursor: "pointer" }}
          />
          {monthValue.format("MMMM YYYY")}
          <ArrowRightIcon
            onClick={() => setMonthValue(monthValue.add(1, "month"))}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className="calendar-days-of-week">
          <div>Sunday</div>
          <div>Monday</div>
          <div>Tuesday</div>
          <div>Wednesday</div>
          <div>Thursday</div>
          <div>Friday</div>
          <div>Saturday</div>
        </div>
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
