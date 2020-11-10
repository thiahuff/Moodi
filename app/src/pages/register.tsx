import React, { useState } from "react"
import Layout from "../components/layout"
import { useForm } from "react-hook-form"
import Auth from "@aws-amplify/auth"
import config from "../../config"
import Axios from "axios"
import FormControl from "@material-ui/core/FormControl"
import Input from "@material-ui/core/Input"
import InputLabel from "@material-ui/core/InputLabel"
import { Button } from "@material-ui/core"
import { navigate } from "gatsby"

Auth.configure(config)

const RegisterPage = () => {
  const { register, handleSubmit, errors } = useForm()

  const onSubmit = async formValues => {
    const { email, password, fname, lname, profile_pic } = formValues
    console.log(formValues)
    const user = await Auth.signUp({ username: email, password })
    console.log(user.userSub)
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input id="email" name="email" inputRef={register} />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="password">Create new password</InputLabel>
          <Input
            id="password"
            type="password"
            name="password"
            inputRef={register}
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="fname">First Name</InputLabel>
          <Input id="fname" name="fname" inputRef={register} />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="lname">Last Name</InputLabel>
          <Input id="lname" name="lname" inputRef={register} />
        </FormControl>
        {/* TODO: Add file upload component once we have we have somewhere to store them (possibly https://github.com/Yuvaleros/material-ui-dropzone) */}
        {/* <label>Profile Picture</label>
        <input type="file" name="profile picture" inputRef={register} /> */}
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </Layout>
  )
}

export default RegisterPage
