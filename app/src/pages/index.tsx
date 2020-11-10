import React, { useState } from "react"
import Layout from "../components/layout"
import { Controller, useForm } from "react-hook-form"
import Auth from "@aws-amplify/auth"
import config from "../../config"
import Axios from "axios"
import { Link, navigate } from "gatsby"
import { Button, FormControl, Input, InputLabel } from "@material-ui/core"

Auth.configure(config)

const IndexPage = () => {
  const { register, handleSubmit, errors } = useForm()

  const onSubmit = async formValues => {
    console.log(formValues)
    const user = await Auth.signIn(formValues)
    console.log(user)

    navigate("/app")
  }

  return (
    <Layout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input id="email" name="username" inputRef={register} />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            type="password"
            name="password"
            inputRef={register}
          />
        </FormControl>
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
      <Link to="/register">
        <Button variant="contained">Register</Button>
      </Link>
    </Layout>
  )
}

export default IndexPage
