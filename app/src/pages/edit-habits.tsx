import Auth from "@aws-amplify/auth"
import {
  Button,
  FormControlLabel,
  Icon,
  InputLabel,
  Radio,
  RadioGroup,
  Slider,
  TextField,
  Tooltip,
} from "@material-ui/core"
import React, { Fragment, useEffect } from "react"
import Layout from "../components/layout"
import { Link, navigate } from "gatsby"
import DeleteForeverIcon from "@material-ui/icons/DeleteForever"
import Axios from "axios"

const EditHabit = () => {
  const getUserHabits = async () => {
    const user = await Auth.currentAuthenticatedUser()
    console.log(user)
    const response = await Axios.get(
      `http://localhost:5000/habits/${user.username}`
    )
  }

  useEffect(() => {
    getUserHabits()
  }, [])

  //   let habits = [
  //       habit_id: 123,
  //       name: "Daily Run",
  //       display_type: "y/n",
  //       habit_type: "positive",
  //       notes: "getting faster!",
  //     },
  //     {
  //       habit_id: 124,
  //       name: "Daily Meditation",
  //       display_type: "y/n",
  //       habit_type: "positive",
  //       notes: "getting so zen",
  //     },
  //     {
  //       habit_id: 125,
  //       name: "Controlled my rage",
  //       description: "Maintain my composure and control my anger.",
  //       display_type: "scale",
  //       habit_type: "positive",
  //     },
  //   ]

  return (
    <Layout>
      <form>
        <h1>Your Habits</h1>

        {/* TODO: Add mapping for user's habits */}
        {/* {habits.map(habit => {
          return (
            <Fragment key={habit.habit_id}>
              {habit.description ? (
                <Tooltip title={habit.description} placement="right">
                  <InputLabel>{habit.name}</InputLabel>
                </Tooltip>
              ) : (
                <InputLabel>{habit.name}</InputLabel>
              )}
              <Button variant="contained" endIcon={<DeleteForeverIcon />}>
                Delete Habit
              </Button>
            </Fragment>
          )
        })} */}
      </form>
    </Layout>
  )
}

export default EditHabit
