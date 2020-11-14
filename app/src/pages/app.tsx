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

const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [habits, setHabits] = useState([])

  const getUserHabits = async () => {
    const user = await Auth.currentAuthenticatedUser()
    const response = await Axios.get(
      `http://localhost:5000/habits/user/${user.username}`
    )
    setHabits(response.data)
    setIsLoading(false)
  }

  useEffect(() => {
    getUserHabits()
  }, [])

  if (isLoading) {
    return "Loading..."
  }

  return (
    <Layout>
      <Log habits={habits} />
      <Link to="/">
        <Button variant="contained">Log Out</Button>
      </Link>
    </Layout>
  )
}

export default App
