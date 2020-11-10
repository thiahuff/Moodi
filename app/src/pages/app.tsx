import Auth from "@aws-amplify/auth"
import {
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

const App = () => {
  const getUser = async () => {
    const user = await Auth.currentAuthenticatedUser()
    console.log(user)
  }

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
      <form>
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
      </form>
    </Layout>
  )
}

export default App

// habit_id = db.Column(db.String, primary_key=True)
//     name = db.Column(db.String, nullable=False)
//     description = db.Column(db.String)
//     display_type = db.Column(db.String, nullable=False)
// habit_type = db.Column(db.String, nullable=False)
//     notes = db.Column(db.String)
