import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Modal,
  Paper,
  Input,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core"
import React, { Fragment, useState } from "react"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import DeleteForeverIcon from "@material-ui/icons/DeleteForever"
import Axios from "axios"

const HabitsForm = ({ habits, refreshHabits }) => {
  const { handleSubmit, control, register } = useForm({
    defaultValues: { habits },
  })

  const { fields } = useFieldArray({
    control,
    name: "habits",
  })

  const [open, setOpen] = useState(false)

  const [selectedHabit, setSelectedHabit] = useState(null)

  const handleClickOpen = habit => {
    setOpen(true)
    setSelectedHabit(habit)
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedHabit(null)
  }

  const confirmDeleteHabit = async () => {
    await Axios.delete(`http://localhost:5000/habits/${selectedHabit.habit_id}`)
    handleClose()
    refreshHabits()
  }

  const submitHabitChanges = async ({ habits }) => {
    console.log(habits)
    await Axios.put("http://localhost:5000/habits", {
      habits,
    })
    refreshHabits()
  }

  return (
    <form onSubmit={handleSubmit(submitHabitChanges)}>
      <h1>Your Habits</h1>

      {fields.map((habit, index) => {
        console.log(habit)
        return (
          <Fragment key={habit.habit_id}>
            <input
              style={{ display: "none" }}
              name={`habits[${index}].habit_id`}
              ref={register}
              value={habit.habit_id}
            />
            <input
              style={{ display: "none" }}
              name={`habits[${index}].user_id`}
              ref={register}
              value={habit.user_id}
            />
            <TextField
              label="Habit Name"
              defaultValue={habit.name}
              variant="outlined"
              name={`habits[${index}].name`}
              inputRef={register}
            />
            <TextField
              label="Habit Description"
              defaultValue={habit.description}
              variant="outlined"
              name={`habits[${index}].description`}
              inputRef={register}
            />
            <FormControl variant="outlined">
              <InputLabel id="habit-display-type">
                How do you want to track this habit?
              </InputLabel>
              <Controller
                as={
                  <Select disabled labelId="habit-display-type">
                    <MenuItem value="y/n">Yes or No</MenuItem>
                    <MenuItem value="slider">1-10 sliding scale</MenuItem>
                  </Select>
                }
                control={control}
                name={`habits[${index}].display_type`}
                ref={register}
                defaultValue={habit.display_type}
              />
            </FormControl>
            <FormControl variant="outlined">
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
                defaultValue={habit.habit_type}
                name={`habits[${index}].habit_type`}
                ref={register}
              />
            </FormControl>

            <div>
              <Button
                variant="outlined"
                color="primary"
                endIcon={<DeleteForeverIcon />}
                onClick={() => handleClickOpen(habit)}
              >
                Delete Habit
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {`Delete ${habit.name}?`}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete this habit? You will not be
                    able to undo this action and all logs for this habit will be
                    deleted.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Nevermind
                  </Button>
                  <Button
                    onClick={confirmDeleteHabit}
                    color="primary"
                    autoFocus
                  >
                    I am sure
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </Fragment>
        )
      })}
      {/* onClick={updateHabit} TODO: Add back to button below */}
      <Button variant="contained" type="submit">
        Submit Changes
      </Button>
    </form>
  )
}

export default HabitsForm
