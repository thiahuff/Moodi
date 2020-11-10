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

const EditHabit = () => {
  const getUser = async () => {
    const user = await Auth.currentAuthenticatedUser()
    console.log(user)
  }

  //   useEffect(() => {
  //     getUser()
  //   }, [])

  return (
    <Layout>
      <form>
        <h1>Your Habits</h1>
        {/* TODO: Add mapping for user's habits */}
        {/* {habits.map(habit => {
            return (
                <>
                {habit.description ? (
                    <Tooltip title={habit.description} placement="right">
                    <InputLabel>{habit.name}</InputLabel>
                    </Tooltip>
                ) : (
                    <InputLabel>{habit.name}</InputLabel>
                )}
                </> */}
      </form>
    </Layout>
  )
}

export default EditHabit
