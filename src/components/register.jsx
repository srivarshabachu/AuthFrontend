import axios from 'axios'
import React from 'react'

const register = () => {
  let a = () => {
    let data = {
      email: "ram@gmail.com",
      username: "ram939",
      password:"9391561206"
    }
    axios.post("https://localhost:7235/api/Authentication/Register?role=Admin",data)
      .then((response) => {
      console.log(response)
      })
      .then((err) =>
      {
        console.log("error is",err)
    })
  }
  return (
    <div>
      <button className="sucess" onClick={a}> submit</button>
    </div>
  )
}

export default register
