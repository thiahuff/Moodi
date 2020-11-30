import Auth from "@aws-amplify/auth"
import {
  Button,
  Dialog,
  DialogContent,
  FormControl,
  FormControlLabel,
  Icon,
  Input,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Slider,
  TextField,
  Tooltip,
} from "@material-ui/core"
import React, { Fragment, useEffect, useState } from "react"
import Layout from "../components/layout"
import { Link, navigate } from "gatsby"
import Axios from "axios"
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline"
import { Controller, useForm } from "react-hook-form"
import HabitsForm from "../components/habits-form"
import Loader from "../components/loader"
import SEO from "../components/seo"

const EditHabit = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [habits, setHabits] = useState([])
  const { register, handleSubmit, errors, control } = useForm()

  const getUserHabits = async () => {
    setIsLoading(true)
    const user = await Auth.currentAuthenticatedUser()
    console.log(user)
    const response = await Axios.get(
      `http://localhost:5000/habits/user/${user.username}`
    )
    setHabits(response.data)
    setIsLoading(false)
  }

  useEffect(() => {
    getUserHabits()
  }, [])

  const onSubmit = async formValues => {
    console.log(formValues)
    setOpen(false)
    const user = await Auth.currentAuthenticatedUser()
    const response = await Axios.post("http://localhost:5000/habits", {
      ...formValues,
      user_id: user.username,
    })
    getUserHabits()
  }

  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <Layout>
      <SEO title="Edit Habits" />
      <HabitsForm habits={habits} refreshHabits={getUserHabits} />
      <Button
        variant="contained"
        endIcon={<AddCircleOutlineIcon />}
        onClick={handleOpen}
      >
        Add Habit
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="create-habit"
        aria-describedby="form-to-create-habit"
      >
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <InputLabel htmlFor="habit_name">Habit Name</InputLabel>
              <Input id="habit_name" name="name" inputRef={register} />
            </FormControl>
            <FormControl>
              <TextField
                label="Description"
                name="description"
                multiline
                rows={4}
                variant="outlined"
                inputRef={register}
              />
            </FormControl>
            <FormControl>
              <InputLabel id="habit-display-type">
                How do you want to track this habit?
              </InputLabel>
              <Controller
                as={
                  <Select labelId="habit-display-type">
                    <MenuItem value="y/n">Yes or No</MenuItem>
                    <MenuItem value="slider">1-10 sliding scale</MenuItem>
                  </Select>
                }
                control={control}
                name="display_type"
              />
            </FormControl>
            <FormControl>
              <InputLabel id="habit-type">
                What kind of habit is this?
              </InputLabel>
              <Controller
                as={
                  <Select labelId="habit-type">
                    <MenuItem value="passive">
                      Neutral - I'm just keeping track
                    </MenuItem>
                    <MenuItem value="active-positive">
                      Positive - I'm trying to do this more!
                    </MenuItem>
                    <MenuItem value="active-negative">
                      Negative - I'm trying to do this less
                    </MenuItem>
                  </Select>
                }
                control={control}
                name="habit_type"
              />
            </FormControl>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Layout>
  )
}

export default EditHabit
