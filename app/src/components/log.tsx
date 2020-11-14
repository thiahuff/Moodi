import Auth from "@aws-amplify/auth"
import {
  InputLabel,
  Slider,
  Tooltip,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button,
  Hidden,
} from "@material-ui/core"
import Axios from "axios"
import dayjs from "dayjs"
import React, { Fragment } from "react"
import { useForm, useFieldArray, Controller } from "react-hook-form"

const Log = ({ habits }) => {
  const { handleSubmit, control, register, setValue, trigger } = useForm({
    defaultValues: { habits },
  })

  const { fields } = useFieldArray({
    control,
    name: "habits",
  })

  const onSubmit = async formValues => {
    const { mood, habits } = formValues
    console.log(formValues)
    const user = await Auth.currentAuthenticatedUser()
    const response = await Axios.post("http://localhost:5000/logs", {
      user_id: user.username,
      date: dayjs().format("MM-DD-YYYY"),
    })
    // TODO: Still need to send habits to the habit_log table with the log_id attached

    const { log_id } = response.data
    const habit_logs = habits.map(habit => {
      const { habit_id, habit_value, notes } = habit
      return { habit_id, habit_value, notes, user_id: user.username, log_id }
    })
    console.log(habit_logs)
    const habitLogResponse = await Axios.post(
      "http://localhost:5000/habit-logs",
      { habit_logs }
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Today's Log</h1>
      {/* TODO: change hardcoded Mood so the date gets sent to db */}
      <InputLabel>Today's Mood</InputLabel>
      <Slider
        defaultValue={5}
        step={0.01}
        max={10}
        min={1}
        valueLabelDisplay="on"
        style={{ color: "blue" }}
      />
      {fields.map((habit, index) => {
        return (
          <Fragment key={habit.habit_id}>
            <input
              style={{ display: "none" }}
              name={`habits[${index}].habit_id`}
              ref={register}
              value={habit.habit_id}
            />

            {habit.description ? (
              <Tooltip title={habit.description} placement="right">
                <InputLabel>{habit.name}</InputLabel>
              </Tooltip>
            ) : (
              <InputLabel>{habit.name}</InputLabel>
            )}
            {habit.display_type === "y/n" ? (
              <Controller
                as={
                  <RadioGroup aria-label="yes or no?" name="y/n">
                    <FormControlLabel
                      value="yes"
                      control={<Radio />}
                      label="yes"
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio />}
                      label="no"
                    />
                  </RadioGroup>
                }
                name={`habits[${index}].habit_value`}
                control={control}
              />
            ) : (
              <Controller
                render={props => (
                  <Slider
                    {...props}
                    onChange={(_, value) => {
                      props.onChange(value)
                    }}
                    step={0.01}
                    max={10}
                    min={1}
                    valueLabelDisplay="on"
                  />
                )}
                defaultValue={5}
                control={control}
                name={`habits[${index}].habit_value`}
              />
            )}
            <TextField
              label="Notes"
              multiline
              rows={4}
              variant="outlined"
              inputRef={register}
              name={`habits[${index}].notes`}
            />
          </Fragment>
        )
      })}
      <Button type="submit" variant="contained">
        Submit
      </Button>
    </form>
  )
}

export default Log
