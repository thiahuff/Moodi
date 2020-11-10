import Auth from "@aws-amplify/auth"
import {
  Button,
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
import DeleteForeverIcon from "@material-ui/icons/DeleteForever"
import Axios from "axios"
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline"
import { Controller, useForm } from "react-hook-form"

const EditHabit = () => {
  const getUserHabits = async () => {
    const user = await Auth.currentAuthenticatedUser()
    console.log(user)
    const response = await Axios.get(
      `http://localhost:5000/habits/${user.username}`
    )
  }
  const { register, handleSubmit, errors, control } = useForm()

  const onSubmit = async formValues => {
    console.log(formValues)
    setOpen(false)
    const user = await Auth.currentAuthenticatedUser()
    const response = await Axios.post("http://localhost:5000/habits", {
      ...formValues,
      user_id: user.username,
    })
  }

  useEffect(() => {
    getUserHabits()
  }, [])

  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

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
      <Button
        variant="contained"
        endIcon={<AddCircleOutlineIcon />}
        onClick={handleOpen}
      >
        Add Habit
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="create-habit"
        aria-describedby="form-to-create-habit"
      >
        <Paper elevation={3}>
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
        </Paper>
      </Modal>
    </Layout>
  )
}

export default EditHabit
