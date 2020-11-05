import React, { useState } from "react"
import Layout from "../components/layout"

const IndexPage = () => {
  const [state, updateState] = useState({
    email: "",
    password: "",
  })

  const [isLoggedIn, setLoggedIn] = useState(false)

  const onChange = evt => {
    const { name, value } = evt.target
    updateState({ ...state, [name]: value })
  }

  const onSubmit = evt => {
    evt.preventDefault()
    console.log(state)

    setLoggedIn(true)
  }

  return (
    <Layout>
      {`Is logged in:${isLoggedIn}`}
      <form onSubmit={onSubmit}>
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={state.email}
          onChange={onChange}
        />

        <label>password</label>
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={onChange}
        />

        <button type="submit">Submit</button>
      </form>
    </Layout>
  )
}

export default IndexPage
