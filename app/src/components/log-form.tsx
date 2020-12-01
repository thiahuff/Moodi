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
  Grid,
} from "@material-ui/core"
import Axios from "axios"
import dayjs from "dayjs"
import React, { Fragment } from "react"
import { useForm, useFieldArray, Controller } from "react-hook-form"
import InfoIcon from "@material-ui/icons/Info"
import "./log-form.scss"

const LogForm = ({ defaultValues, onSubmit }) => {
  const { handleSubmit, control, register, setValue, trigger } = useForm({
    defaultValues,
  })

  const { fields } = useFieldArray({
    control,
    name: "habits",
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <h1>Today's Log</h1>
        <Grid item xs={12}>
          <InputLabel className="title">Today's Mood</InputLabel>
        </Grid>
        <Grid item xs={12}>
          <Controller
            render={props => (
              <Slider
                className="slider-gradient"
                {...props}
                onChange={(_, value) => {
                  props.onChange(value)
                }}
                step={0.1}
                max={10}
                min={1}
                valueLabelDisplay="on"
                // style={{ color: "blue" }}
              />
            )}
            defaultValue={defaultValues.mood_value}
            control={control}
            name="mood_value"
          />
        </Grid>
        {fields.map((habit, index) => {
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
                name={`habits[${index}].habit_log_id`}
                ref={register}
                value={habit.habit_log_id}
              />
              {/* Habit Description and Name*/}
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <InputLabel
                  className="title"
                  style={{ width: "fit-content", marginRight: "0.5rem" }}
                >
                  {habit.name}
                </InputLabel>
                {habit.description && (
                  <Tooltip title={habit.description} placement="right">
                    <InfoIcon color="secondary" />
                  </Tooltip>
                )}
              </Grid>
              {/* Habit Value Y/N */}
              {habit.display_type === "y/n" ? (
                <Grid item xs={12} sm={3}>
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
                    defaultValue={habit.habit_value || "yes"}
                  />
                </Grid>
              ) : (
                <Grid item xs={12}>
                  <Controller
                    render={props => (
                      <Slider
                        className="slider-gradient"
                        {...props}
                        onChange={(_, value) => {
                          props.onChange(value)
                        }}
                        step={0.1}
                        max={10}
                        min={1}
                        valueLabelDisplay="on"
                      />
                    )}
                    defaultValue={habit.habit_value || 5}
                    control={control}
                    name={`habits[${index}].habit_value`}
                  />
                </Grid>
              )}
              <Grid item xs={12} sm={6}>
                <Controller
                  render={props => (
                    <TextField
                      {...props}
                      label="Notes"
                      multiline
                      rows={4}
                      variant="outlined"
                    />
                  )}
                  name={`habits[${index}].notes`}
                  defaultValue={habit.notes || ""}
                  control={control}
                />
              </Grid>
            </Fragment>
          )
        })}
      </Grid>
      <Grid container justify="flex-end">
        <Button type="submit" variant="contained" size="large">
          Submit
        </Button>
      </Grid>
    </form>
  )
}

export default LogForm
