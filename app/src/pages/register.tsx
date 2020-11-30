import React, { useState } from "react"
import Layout from "../components/layout"
import { useForm } from "react-hook-form"
import Auth from "@aws-amplify/auth"
import config from "../../config"
import Axios from "axios"
import FormControl from "@material-ui/core/FormControl"
import Input from "@material-ui/core/Input"
import InputLabel from "@material-ui/core/InputLabel"
import { Button, FormHelperText, Grid } from "@material-ui/core"
import { navigate } from "gatsby"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import SEO from "../components/seo"

interface FormValues {
  email: string
  password: string
  fname: string
  lname: string
  profile_pic?: string
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup
    .string()
    .required()
    .matches(
      new RegExp("(?=.*[a-z])"),
      "Your password must have one lower case character"
    )
    .matches(
      new RegExp("(?=.*[A-Z])"),
      "Your password must have one upper case character"
    )
    .matches(new RegExp("(?=.*[0-9])"), "Your password must have one number")
    .matches(
      new RegExp(".{8,}"),
      "Your password must be at least eight characters long"
    ),
  fname: yup.string().required(),
  lname: yup.string().required(),
})

const RegisterPage = () => {
  const { register, handleSubmit, errors } = useForm<FormValues>({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (formValues: FormValues) => {
    const { email, password, fname, lname, profile_pic } = formValues
    const user = await Auth.signUp({ username: email, password })
    const response = await Axios.post("http://localhost:5000/users", {
      user_id: user.userSub,
      email,
      fname,
      lname,
      profile_pic,
    })
    navigate("/")
  }

  return (
    <Layout>
      <SEO title="Register" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          {/* Email */}
          <Grid item xs={12} sm={6} md={3}>
            <FormControl error={!!errors.email}>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input id="email" name="email" inputRef={register} />
              <FormHelperText>{errors.email?.message}</FormHelperText>
            </FormControl>
          </Grid>

          {/* Password */}
          <Grid item xs={12} sm={6} md={3}>
            <FormControl error={!!errors.password}>
              <InputLabel htmlFor="password">Create new password</InputLabel>
              <Input
                id="password"
                type="password"
                name="password"
                inputRef={register}
              />
              <FormHelperText>{errors.password?.message}</FormHelperText>
            </FormControl>
          </Grid>

          {/* First Name */}
          <Grid item xs={12} sm={6} md={3}>
            <FormControl error={!!errors.fname}>
              <InputLabel htmlFor="fname">First Name</InputLabel>
              <Input id="fname" name="fname" inputRef={register} />
              <FormHelperText>{errors.fname?.message}</FormHelperText>
            </FormControl>
          </Grid>

          {/* Last Name */}
          <Grid item xs={12} sm={6} md={3}>
            <FormControl error={!!errors.lname}>
              <InputLabel htmlFor="lname">Last Name</InputLabel>
              <Input id="lname" name="lname" inputRef={register} />
              <FormHelperText>{errors.lname?.message}</FormHelperText>
            </FormControl>
          </Grid>

          {/* TODO: Add file upload component once we have we have somewhere to store them (possibly https://github.com/Yuvaleros/material-ui-dropzone) */}
          {/* <label>Profile Picture</label>
        <input type="file" name="profile picture" inputRef={register} /> */}
          <Grid item xs={12} sm={6} md={3}>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Layout>
  )
}

export default RegisterPage
