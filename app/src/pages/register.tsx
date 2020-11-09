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

Auth.configure(config)

const RegisterPage = () => {
  const { register, handleSubmit, errors } = useForm()

  const onSubmit = async ({
    username,
    password,
    fname,
    lname,
    profile_pic,
  }) => {
    const response = await Axios.post("http://localhost:5000/users", {
      email: username,
      fname,
      lname,
      profile_pic,
    })
    // const user = await Auth.signUp(formValues)
    // console.log(user)
  }

  return (
    <Layout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <InputLabel htmlFor="username">Email</InputLabel>
          <Input id="username" name="username" ref={register} />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="password">Create new password</InputLabel>
          <Input id="password" type="password" name="password" ref={register} />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="fname">First Name</InputLabel>
          <Input id="fname" name="first name" ref={register} />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="lname">First Name</InputLabel>
          <Input id="lname" name="last name" ref={register} />
        </FormControl>
        {/* TODO: Add file upload component once we have we have somewhere to store them (possibly https://github.com/Yuvaleros/material-ui-dropzone) */}
        {/* <label>Profile Picture</label>
        <input type="file" name="profile picture" ref={register} /> */}
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </Layout>
  )
}

export default RegisterPage
