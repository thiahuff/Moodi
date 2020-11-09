import React, { useState } from "react"
import Layout from "../components/layout"
import { Controller, useForm } from "react-hook-form"
import Auth from "@aws-amplify/auth"
import config from "../../config"
import Axios from "axios"

Auth.configure(config)

const IndexPage = () => {
  const { register, handleSubmit, errors } = useForm()


  const onSubmit = async formValues => {
    console.log(formValues)
    const response = await Axios.post("http://localhost:5000/users", { user_id: "123", fname: 'Cynthia' })
    // const user = await Auth.signUp(formValues)
    // console.log(user)
  }

  return (
    <Layout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input type="text" name="username" ref={register} />
        <label>password</label>
        <input type="password" name="password" ref={register} />
        <button type="submit">Submit</button>
        <button type="button" onClick={() =>
         </button>
      </form>
    </Layout>
  )
}

export default IndexPage
