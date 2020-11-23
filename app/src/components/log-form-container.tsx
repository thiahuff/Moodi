import Auth from "@aws-amplify/auth"
import Axios from "axios"
import dayjs from "dayjs"
import React, { useEffect, useState } from "react"
import { Habit, HabitLog, Log as LogType } from "../types"
import LogForm from "./log-form"

interface Props {
  date: dayjs.Dayjs
  afterSubmit?: Function
}

const LogFormContainer = ({ date, afterSubmit }: Props) => {
  const [isLoading, setIsLoading] = useState(true)
  const [defaultValues, setDefaultValues] = useState({})
  const [todaysLog, setTodaysLog] = useState(null)

  const getUserDailyLogData = async () => {
    const user = await Auth.currentAuthenticatedUser()
    // Get user logs
    // TODO: Dates are awful I'm so sorry
    const { data: log } = await Axios.get<LogType>(
      `http://localhost:5000/logs/user/${user.username}/${date.format(
        "MM-DD-YYYY"
      )}`
    )
    // Get user habits
    const { data: habits } = await Axios.get<Habit[]>(
      `http://localhost:5000/habits/user/${user.username}`
    )

    if (log) {
      setTodaysLog(log)

      // call api to get habit logs
      const { data: habitLogs } = await Axios.get<HabitLog[]>(
        `http://localhost:5000/habit-logs/log/${log.log_id}`
      )
      // join habits to habit logs
      const joinedData = habits.map(habit => {
        // grab associated habit_log
        const matchingLog = habitLogs.find(
          habitLog => habitLog.habit_id === habit.habit_id
        )

        if (!matchingLog) {
          return habit
        }

        return {
          ...habit,
          ...matchingLog,
          habit_value:
            habit.display_type === "slider"
              ? parseFloat(matchingLog.habit_value)
              : matchingLog.habit_value,
        }
      })
      // set default values to joined data
      const defaultValues = {
        mood_value: log.mood_value || 5,
        habits: joinedData,
      }

      setDefaultValues(defaultValues)
    } else {
      const defaultValues = {
        mood_value: 5,
        habits,
      }

      setDefaultValues(defaultValues)
    }

    setIsLoading(false)
  }

  useEffect(() => {
    getUserDailyLogData()
  }, [])

  const onCreateSubmit = async formValues => {
    const { mood_value, habits } = formValues
    const user = await Auth.currentAuthenticatedUser()
    const response = await Axios.post("http://localhost:5000/logs", {
      user_id: user.username,
      date: date.toISOString(),
      mood_value,
    })

    const { log_id } = response.data
    const habit_logs = habits.map(habit => {
      const { habit_id, habit_value, notes } = habit
      return { habit_id, habit_value, notes, user_id: user.username, log_id }
    })
    const habitLogResponse = await Axios.post(
      "http://localhost:5000/habit-logs",
      { habit_logs }
    )
    if (afterSubmit) {
      afterSubmit()
    }
  }

  const onUpdateSubmit = async formValues => {
    const { mood_value, habits } = formValues
    const user = await Auth.currentAuthenticatedUser()
    const response = await Axios.put("http://localhost:5000/logs", {
      log_id: todaysLog.log_id,
      user_id: user.username,
      date: todaysLog.date,
      mood_value,
    })

    const { log_id } = response.data
    const habit_logs = habits.map(habit => {
      const { habit_id, habit_value, notes, habit_log_id } = habit
      return {
        habit_id,
        habit_value,
        notes,
        user_id: user.username,
        log_id,
        habit_log_id,
      }
    })
    const habitLogResponse = await Axios.put(
      "http://localhost:5000/habit-logs",
      { habit_logs }
    )
    if (afterSubmit) {
      afterSubmit()
    }
  }

  if (isLoading) {
    return <div>"Loading..."</div>
  }

  return (
    <LogForm
      defaultValues={defaultValues}
      onSubmit={todaysLog ? onUpdateSubmit : onCreateSubmit}
    />
  )
}

export default LogFormContainer
