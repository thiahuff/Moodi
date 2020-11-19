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

const Log = ({ defaultValues, onSubmit }) => {
  const { handleSubmit, control, register, setValue, trigger } = useForm({
    defaultValues,
  })

  const { fields } = useFieldArray({
    control,
    name: "habits",
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Today's Log</h1>
      <InputLabel>Today's Mood</InputLabel>
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
            style={{ color: "blue" }}
          />
        )}
        defaultValue={defaultValues.mood_value}
        control={control}
        name="mood_value"
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
                defaultValue="yes"
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
