import Auth from "@aws-amplify/auth"
import {
  Button,
  FormControlLabel,
  InputLabel,
  Radio,
  RadioGroup,
  Slider,
  TextField,
  Tooltip,
} from "@material-ui/core"
import React, { Fragment, useEffect, useState } from "react"
import Layout from "../components/layout"
import { Link, navigate } from "gatsby"
import dayjs from "dayjs"
import Axios from "axios"
import { useForm, useFieldArray, Controller } from "react-hook-form"
import Log from "../components/log"
import { Habit, Log as LogType } from "../types"

const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [defaultValues, setDefaultValues] = useState({})
  const [todaysLog, setTodaysLog] = useState(null)

  const getUserDailyLogData = async () => {
    const user = await Auth.currentAuthenticatedUser()
    const { data: log } = await Axios.get<LogType>(
      `http://localhost:5000/logs/user/${user.username}/${dayjs().format(
        "MM-DD-YYYY"
      )}`
    )

    if (log) {
      setTodaysLog(log)
    }

    const { data: habits } = await Axios.get<Habit[]>(
      `http://localhost:5000/habits/user/${user.username}`
    )

    const defaultValues = {
      mood_value: log?.mood_value || 5,
      habits,
    }

    setDefaultValues(defaultValues)
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
      date: dayjs().format("MM-DD-YYYY"),
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
  }

  const onUpdateSubmit = async formValues => {
    const { mood_value, habits } = formValues
    const user = await Auth.currentAuthenticatedUser()
    const response = await Axios.put("http://localhost:5000/logs", {
      log_id: todaysLog.log_id,
      user_id: user.username,
      date: dayjs().format("MM-DD-YYYY"),
      mood_value,
    })

    const { log_id } = response.data
    const habit_logs = habits.map(habit => {
      const { habit_id, habit_value, notes } = habit
      return { habit_id, habit_value, notes, user_id: user.username, log_id }
    })
    const habitLogResponse = await Axios.put(
      "http://localhost:5000/habit-logs",
      { habit_logs }
    )
  }

  if (isLoading) {
    return "Loading..."
  }

  return (
    <Layout>
      <Log
        defaultValues={defaultValues}
        onSubmit={todaysLog ? onUpdateSubmit : onCreateSubmit}
      />
    </Layout>
  )
}

export default App
