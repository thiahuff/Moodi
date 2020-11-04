import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => {
  const onSubmit = evt => {
    evt.preventDefault()
    console.log("Hello")
  }
  return (
    <Layout>
      <form onSubmit={onSubmit}>
        <label>Email</label>
        <input type="text" name="email" />

        <label>password</label>
        <input type="password" name="password" />

        <button type="submit">Submit</button>
      </form>
    </Layout>
  )
}

export default IndexPage
