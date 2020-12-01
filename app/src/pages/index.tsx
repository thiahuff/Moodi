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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} justify="center">
          {/* Email */}
          <Grid item xs={12} md={4}>
            <FormControl>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input id="email" name="username" inputRef={register} />
            </FormControl>
          </Grid>

          {/* Password */}
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

          {/* Submit Button */}
          <Grid item xs={12} md={4}>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
      <Grid container spacing={2} justify="flex-end">
        <Grid item xs={12} md={4}>
          <Link to="/register">
            <Button variant="contained">Register</Button>
          </Link>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default IndexPage
