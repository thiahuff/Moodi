import React, { useState } from "react"
import Layout from "../components/layout"
import { useForm } from "react-hook-form"

const IndexPage = () => {
  const { register, handleSubmit, errors } = useForm()

  const [isLoggedIn, setLoggedIn] = useState(false)

  const onSubmit = formValues => {
    console.log(formValues)

    setLoggedIn(true)
  }
  
  return (
    <Layout>
      {`Is logged in:${isLoggedIn}`}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Enter Your Email</label>
        <input type="text" name="email" ref={register} />

        <label>Create your password</label>
        <input type="password" name="password" ref={register} />

        <button type="submit">Submit</button>
      </form>
    </Layout>
  )
}

export default IndexPage
