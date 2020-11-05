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
      <br />
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input type="text" name="email" ref={register} />
        <br />
        <br />
        <label>password</label>
        <input type="password" name="password" ref={register} />

        <button type="submit">Submit</button>
        <br />
      </form>
    </Layout>
  )
}

export default IndexPage
