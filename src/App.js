import React from 'react'
import axios from 'axios'

function App() {
  let a = () => {
    let data = {
      Email: "ramcharan.pathiri@gmail.com",
      Username: "ram",
      Password: "93915616@Ram"
    }
    axios.post("https://localhost:7235/api/Authentication/Register?role=User", data)
      .then((response) => {
        console.log(response)
      })
      .catch((err) => {
        console.log("error is ", err);
      })
  }
  return (
    <div>
      <button className="sucess" onClick={a}> submit</button>
    </div>
  )
}

export default App

