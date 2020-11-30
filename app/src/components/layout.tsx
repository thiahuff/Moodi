import React from "react"
import PropTypes from "prop-types"

import "normalize.css"
import "./layout.scss"
import Navbar from "./navbar"

const Layout = ({ children }) => {
  return (
    <>
      {/* <Header siteTitle={"moodi"} /> */}
      <Navbar />
      <div
        style={{
          margin: `1rem auto 0`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>{children}</main>
        <footer
          style={{
            marginTop: `2rem`,
          }}
        ></footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
