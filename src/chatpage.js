import React, {useState, useEffect} from 'react';

const ChatPage = ({chatMessages, setChatMessages, displayChat, socket})=>{
    const [message, setMessage]= useState('')
    //console.log(chatMessages)

    // useEffect(()=>{
    //     const socket = io();
    //     socket.on('message', ({text})=>{
    //         console.log(message);
    //         setChatMessages([...chatMessages, message]);
    //         //displayChat({text});
    //     })
    // }, [])

  const onSubmit = (ev)=>{
      ev.preventDefault();
      const socket = io();
      socket.emit('message', message)
  }
  return(
      <div>
          <form onSubmit={onSubmit}>
              <input onChange= {(ev)=>setMessage(ev.target.value) } value = {message}></input>
              <button>Send</button>
          </form>
          <ul id = 'messages'>

          </ul>
      </div>

  )
}

export default ChatPage
