import {
  AppBar,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Toolbar,
  Typography,
} from "@material-ui/core"
import React, { useEffect, useState } from "react"
import MenuIcon from "@material-ui/icons/Menu"
import { Link, navigate } from "gatsby"
import EqualizerIcon from "@material-ui/icons/Equalizer"
import EditIcon from "@material-ui/icons/Edit"
import DateRangeIcon from "@material-ui/icons/DateRange"
import Axios from "axios"
import Auth from "@aws-amplify/auth"
import HomeIcon from "@material-ui/icons/Home"
import "./navbar.scss"

const Navbar = () => {
  const [drawerOpen, setOpen] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)

  const isLoggedIn = async () => {
    const user = await Auth.currentAuthenticatedUser()
    setLoggedIn(!!user)
  }

  const logOut = async () => {
    await Auth.signOut()
  }

  useEffect(() => {
    isLoggedIn()
  }, [])

  return (
    <>
      <AppBar id="gradient" position="sticky">
        <Toolbar>
          <IconButton
            onClick={() => setOpen(true)}
            edge="start"
            // color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <h1 style={{ margin: 0 }}>
            <Link to={loggedIn ? "/app" : "/"} className="logo-link">
              moodi
            </Link>
          </h1>
          <Link className="logout" to="/">
            {loggedIn ? (
              <Button onClick={logOut} color="inherit">
                Log Out
              </Button>
            ) : (
              <Button color="inherit">Login</Button>
            )}
          </Link>
        </Toolbar>
      </AppBar>

      <SwipeableDrawer
        open={drawerOpen}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        <List>
          <Link to="/app">
            <ListItem>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText>Home</ListItemText>
            </ListItem>
          </Link>

          <Link to="/edit-habits">
            <ListItem>
              <ListItemIcon>
                <EditIcon />
              </ListItemIcon>
              <ListItemText>Edit Habits</ListItemText>
            </ListItem>
          </Link>
          <Link to="/graph-view">
            <ListItem>
              <ListItemIcon>
                <EqualizerIcon />
              </ListItemIcon>
              <ListItemText>Graph View</ListItemText>
            </ListItem>
          </Link>
          <Link to="/calendar">
            <ListItem>
              <ListItemIcon>
                <DateRangeIcon />
              </ListItemIcon>
              <ListItemText>Calendar</ListItemText>
            </ListItem>
          </Link>
        </List>
      </SwipeableDrawer>
    </>
  )
}
export default Navbar
