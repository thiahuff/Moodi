import { Line } from "react-chartjs-2"
import React, { useEffect, useState } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Auth from "@aws-amplify/auth"
import Axios from "axios"
import dayjs from "dayjs"
import DayJsUtils from "@material-ui/pickers/adapter/dayjs"
import {
  DateRangePicker,
  DateRange,
  DateRangeDelimiter,
  LocalizationProvider,
} from "@material-ui/pickers"
import { TextField } from "@material-ui/core"
import "./graph-view.scss"
import { RangeInput } from "@material-ui/pickers/DateRangePicker/RangeTypes"

const colors = [
  "rgba(84, 71, 140, 1)",
  "rgba(44, 105, 154, 1)",
  "rgba(18, 127, 162, 1)",
  "rgba(13, 179, 158, 1)",
  "rgba(22, 219, 147, 1)",
  "rgba(131, 227, 119, 1)",
  "rgba(185, 231, 105, 1)",
  "rgba(239, 234, 90, 1)",
  "rgba(241, 196, 83, 1)",
  "rgba(242, 158, 76, 1)",
]

const GraphView = () => {
  const [data, setData] = useState(null)
  const [selectedDate, setSelectedDate] = React.useState<
    [dayjs.Dayjs, dayjs.Dayjs]
  >([dayjs().subtract(30, "day"), dayjs()])

  const getUserData = async () => {
    const user = await Auth.currentAuthenticatedUser()
    const { data: logs } = await Axios.get(
      `http://localhost:5000/logs/user/${user.username}`,
      {
        params: {
          start_date: selectedDate[0].format("YYYY-MM-DD"),
          end_date: selectedDate[1].format("YYYY-MM-DD"),
        },
      }
    )
    const { data: habitLogs } = await Axios.get(
      `http://localhost:5000/habit-logs/user/${user.username}`,
      {
        params: {
          start_date: selectedDate[0].format("YYYY-MM-DD"),
          end_date: selectedDate[1].format("YYYY-MM-DD"),
        },
      }
    )
    const { data: habits } = await Axios.get(
      `http://localhost:5000/habits/user/${user.username}`
    )

    const datasets = habits.map((habit, index) => {
      const habitLogsForHabit = habitLogs.filter(
        hl => hl.habit_id === habit.habit_id
      )
      return {
        label: habit.name,
        fill: false,
        backgroundColor: colors[(index + 1) % colors.length],
        borderColor: colors[(index + 1) % colors.length],
        data: logs.map(log => {
          const correspondingHabitLog = habitLogsForHabit.find(
            hl => hl.log_id === log.log_id
          )
          if (!correspondingHabitLog) {
            return 0
          }
          return habit.display_type === "slider"
            ? parseFloat(correspondingHabitLog.habit_value)
            : correspondingHabitLog.habit_value === "yes"
            ? 10
            : 0
        }),
      }
    })

    datasets.unshift({
      label: "Mood",
      fill: false,
      // lineTension: 0.1,
      backgroundColor: colors[0],
      borderColor: colors[0],
      // borderCapStyle: "butt",
      // borderDash: [],
      // borderDashOffset: 0.0,
      // borderJoinStyle: "miter",
      // // pointBorderColor: "rgba(75,192,192,1)",
      // // pointBackgroundColor: "#fff",
      // pointBorderWidth: 1,
      // pointHoverRadius: 5,
      // // pointHoverBackgroundColor: "rgba(75,192,192,1)",
      // // pointHoverBorderColor: "rgba(220,220,220,1)",
      // pointHoverBorderWidth: 2,
      // pointRadius: 1,
      // pointHitRadius: 10,
      data: logs.map(log => (log.mood_value ? log.mood_value : 0)),
    })

    const data = {
      labels: logs.map(log => dayjs(log.date).format("MM/DD")),
      datasets,
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                suggestedMin: 0,
                suggestedMax: 10,
              },
            },
          ],
        },
      },
    }
    setData(data)
  }

  useEffect(() => {
    if (selectedDate[0] && selectedDate[1]) {
      getUserData()
    }
  }, [selectedDate])

  return (
    <Layout>
      <SEO title="Graph View" />
      <h1>Graph View</h1>
      <LocalizationProvider dateAdapter={DayJsUtils}>
        <DateRangePicker
          className="date-filter"
          startText="Start Date"
          endText="End Date"
          value={selectedDate}
          onChange={value => setSelectedDate(value)}
          renderInput={(startProps, endProps) => (
            <React.Fragment>
              <TextField {...startProps} />
              <DateRangeDelimiter> to </DateRangeDelimiter>
              <TextField {...endProps} />
            </React.Fragment>
          )}
        />
      </LocalizationProvider>
      <Line
        data={data}
        options={{
          scales: {
            yAxes: [
              {
                ticks: {
                  suggestedMin: 0,
                  suggestedMax: 10,
                },
              },
            ],
          },
        }}
      />
    </Layout>
  )
}

export default GraphView
