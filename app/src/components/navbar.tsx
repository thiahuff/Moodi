import {
  AppBar,
  Button,
  IconButton,
  SwipeableDrawer,
  Toolbar,
  Typography,
} from "@material-ui/core"
import React, { useState } from "react"
import MenuIcon from "@material-ui/icons/Menu"
import { Link } from "gatsby"

const Navbar = () => {
  const [drawerOpen, setOpen] = useState(false)
  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            onClick={() => setOpen(true)}
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <h1 style={{ margin: 0 }}>
            <Link
              to="/"
              style={{
                color: `white`,
                textDecoration: `none`,
              }}
            >
              moodi
            </Link>
          </h1>
          <Link to="/">
            <Button color="inherit">Login</Button>
          </Link>
        </Toolbar>
      </AppBar>

      <SwipeableDrawer
        open={drawerOpen}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        <Link to="/edit-habits">Edit Habits</Link>
        <Link to="/graph-view">Graph View</Link>
        <Link to="/calendar-view">Calendar View</Link>
      </SwipeableDrawer>
    </>
  )
}
export default Navbar
