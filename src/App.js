import React, { Component, useEffect, useState } from "react"
import axios from "axios"
import Pusher from "pusher-js"
import { ChatList } from "./ChatList"
import { ChatBox } from "./ChatBox"

import "./App.css"

const App = () => {
  const [text, setText] = useState("")
  const [username, setUsername] = useState("")
  let [chats, setChats] = useState([])
  const handleTextChange = (e) => {
    if (e.keyCode === 13) {
      const payload = {
        username: username,
        message: text,
      }
      axios.post("http://localhost:5000/message", payload)
    } else {
      setText(e.target.value)
    }
  }
  useEffect(() => {
    const username = window.prompt("Username: ", "Anonymous")
    setUsername(username)
    const pusher = new Pusher("8c79b67adca098eeafac", {
      cluster: "ap2",
      encrypted: true,
    })
    const channel = pusher.subscribe("chat")
    channel.bind("message", (data) => {
      // console.log("data:", data)
      chats.push(data)
      setChats([...chats])
      // console.log(chats)
    })
  }, [])

  return (
    <div className="App">
      <h1 className="App-title">Welcome to React-Pusher Chat</h1>

      <section>
        <ChatList chats={chats} />
        <ChatBox
          text={text}
          username={username}
          handleTextChange={handleTextChange}
        />
      </section>
    </div>
  )
}

export default App
//////////////////////////////////////
// import React, { Component } from "react"
// import axios from "axios"
// import Pusher from "pusher-js"
// import { ChatList } from "./ChatList"
// import { ChatBox } from "./ChatBox"
// import logo from "./logo.svg"
// import "./App.css"
/*
export const App=()=> {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     text: "",
  //     username: "",
  //     chats: [],
  //   }
  // }

  const [text, setText] = useState("")
  const [username, setUsername] = useState("")
  const [chats, setChats] = useState([])

  useEffect(() => {
    const username = window.prompt("Username: ", "Anonymous")
    setUsername(username )
    const pusher = new Pusher("8c79b67adca098eeafac", {
      cluster: "ap2",
      encrypted: true,
    })
    const channel = pusher.subscribe("chat")
    channel.bind("message", (data) => {
      setChats([...this.state.chats, data])
    })
    this.handleTextChange = this.handleTextChange.bind(this)
  }, [])
  

  handleTextChange(e) {
    if (e.keyCode === 13) {
      const payload = {
        username: this.state.username,
        message: this.state.text,
      }
      axios.post("http://localhost:5000/message", payload)
    } else {
      this.setState({ text: e.target.value })
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React-Pusher Chat</h1>
        </header>
        <section>
          <ChatList chats={this.state.chats} />
          <ChatBox
            text={this.state.text}
            username={this.state.username}
            handleTextChange={this.handleTextChange}
          />
        </section>
      </div>
    )
  }
}

export default App
*/
