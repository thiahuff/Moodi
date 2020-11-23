import React, { useEffect, useState } from "react"
import Layout from "../components/layout"
import Calendar from "../components/calendar"
import Auth from "@aws-amplify/auth"
import Axios from "axios"

const CalendarView = () => {
  // State to hold logs
  const [logData, setLogData] = useState([])

  // Logic to grab logs
  const getUserData = async () => {
    const user = await Auth.currentAuthenticatedUser()
    const { data: logs } = await Axios.get(
      `http://localhost:5000/logs/user/${user.username}`
    )
    setLogData(logs)
  }

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <Layout>
      <Calendar logs={logData} refreshLogs={getUserData} />
    </Layout>
  )
}

export default CalendarView
