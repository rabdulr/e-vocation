import React, {useState} from 'react';

const ChatPage = ({chatMessages, setChatMessages})=>{
  const [message, setMessage]= useState('')
  console.log(chatMessages)

  const onSubmit = (ev)=>{
      ev.preventDefault();
      setChatMessages([...chatMessages, message]);
  }
  return(
      <div>
          <form onSubmit={onSubmit}>
              <input onChange= {(ev)=>setMessage(ev.target.value) } value = {message}></input>
              <button>Send</button>
          </form>
          <ul>
              {
                  chatMessages.map((message, idx) =>{
                      return(
                          <li key ={idx}>
                              {message}
                          </li>
                      )
                  })
              }
          </ul>
      </div>

  )
}

export default ChatPage
