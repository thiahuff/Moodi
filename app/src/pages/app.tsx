import Auth from "@aws-amplify/auth"
import {
  Button,
  FormControlLabel,
  Grid,
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
import { Habit, Log as LogType, HabitLog } from "../types"
import LogFormContainer from "../components/log-form-container"
import SEO from "../components/seo"

const App = () => {
  const now = dayjs()
  return (
    <Layout>
      <SEO title="Home" />
      <LogFormContainer date={now} />
    </Layout>
  )
}

export default App
