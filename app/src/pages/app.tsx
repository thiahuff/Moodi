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
import React, { useEffect } from "react"
import Layout from "../components/layout"
import { Link, navigate } from "gatsby"
import dayjs from "dayjs"
import Axios from "axios"
import { useForm, useFieldArray } from "react-hook-form"

const App = () => {
  const getUser = async () => {
    const user = await Auth.currentAuthenticatedUser()
    console.log(user)
  }

  const onSubmit = async formValues => {
    console.log(formValues)
    const user = await Auth.currentAuthenticatedUser()
    const response = await Axios.post("http://localhost:5000/logs", {
      user_id: user.username,
      date: dayjs().format("MM-DD-YYYY"),
    })
    // TODO: Still need to send habits to the habit_log table with the log_id attached
    const { log_id } = response.data
    const habitLogResponse = await Axios.post(
      "http://localhost:5000/habit-logs",
      {}
    )
  }

  const { handleSubmit } = useForm()

  useEffect(() => {
    getUser()
  }, [])

  const habits = [
    {
      habit_id: 123,
      name: "Daily Run",
      display_type: "y/n",
      habit_type: "positive",
      notes: "getting faster!",
    },
    {
      habit_id: 124,
      name: "Daily Meditation",
      display_type: "y/n",
      habit_type: "positive",
      notes: "getting so zen",
    },
    {
      habit_id: 125,
      name: "Controlled my rage",
      description: "Maintain my composure and control my anger.",
      display_type: "scale",
      habit_type: "positive",
    },
  ]

  return (
    <Layout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Today's Log</h1>
        <InputLabel>Today's Mood</InputLabel>
        <Slider
          defaultValue={5}
          step={0.01}
          max={10}
          min={1}
          valueLabelDisplay="on"
          style={{ color: "blue" }}
        />
        {habits.map(habit => {
          return (
            <>
              {habit.description ? (
                <Tooltip title={habit.description} placement="right">
                  <InputLabel>{habit.name}</InputLabel>
                </Tooltip>
              ) : (
                <InputLabel>{habit.name}</InputLabel>
              )}
              {habit.display_type === "y/n" ? (
                <RadioGroup aria-label="yes or no?" name="y/n">
                  <FormControlLabel
                    value="yes"
                    control={<Radio />}
                    label="yes"
                  />
                  <FormControlLabel value="no" control={<Radio />} label="no" />
                </RadioGroup>
              ) : (
                <Slider
                  defaultValue={5}
                  step={0.01}
                  max={10}
                  min={1}
                  valueLabelDisplay="on"
                  style={{ color: "blue" }}
                />
              )}
              <TextField label="Notes" multiline rows={4} variant="outlined" />
            </>
          )
        })}
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
      <Link to="/">
        <Button variant="contained">Log Out</Button>
      </Link>
    </Layout>
  )
}

export default App
