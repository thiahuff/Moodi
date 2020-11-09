import React, { useState } from "react"
import Layout from "../components/layout"
import { useForm } from "react-hook-form"
import Auth from "@aws-amplify/auth"
import config from "../../config"
import Axios from "axios"

Auth.configure(config)

const RegisterPage = () => {
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
        <label>Create new password</label>
        <input type="password" name="password" ref={register} />
        <label>First Name</label>
        <input type="text" name="first name" ref={register} />
        <label>Last Name</label>
        <input type="text" name="last name" ref={register} />
        <label>Profile Picture</label>
        <input type="file" name="profile picture" ref={register} />
        <button type="submit">Submit</button>
      </form>
    </Layout>
  )
}

export default RegisterPage