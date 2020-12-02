import React, { useState } from "react"
import Layout from "../components/layout"
import { Controller, useForm } from "react-hook-form"
import Auth from "@aws-amplify/auth"
import config from "../../config"
import Axios from "axios"
import { Link, navigate } from "gatsby"
import { Button, FormControl, Grid, Input, InputLabel } from "@material-ui/core"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import SEO from "../components/seo"
import "./index.scss"

Auth.configure(config)
dayjs.extend(utc)

const IndexPage = () => {
  const { register, handleSubmit } = useForm()

  const onSubmit = async formValues => {
    const user = await Auth.signIn(formValues)
    navigate("/app")
  }

  return (
    <Layout>
      <SEO title="Login" />
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        {/* Title */}
        <Grid container justify="center">
          <h1>moodi</h1>
        </Grid>

        {/* Email */}
        <Grid container justify="center">
          <Grid item xs={12} md={4}>
            <FormControl>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input id="email" name="username" inputRef={register} />
            </FormControl>
          </Grid>
        </Grid>

        {/* Password */}
        <Grid container justify="center">
          <Grid item xs={12} md={4}>
            <FormControl>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password"
                type="password"
                name="password"
                inputRef={register}
              />
            </FormControl>
          </Grid>
        </Grid>

        {/* Submit Button */}
        <Grid container justify="center">
          <Grid item xs={12} md={4}>
            <Button color="primary" type="submit" variant="contained">
              Submit
            </Button>
          </Grid>
        </Grid>

        {/* Register */}
        <Grid container justify="center">
          <Grid item xs={12} md={4}>
            <Button variant="contained" onClick={() => navigate("/register")}>
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
    </Layout>
  )
}

export default IndexPage
