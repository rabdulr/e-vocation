import React, {useState, useEffect} from 'react';

const ChatPage = ({chatMessages, setChatMessages, displayChat, socket, auth})=>{
    const [message, setMessage]= useState('')
    //console.log(auth)

    const onSubmit = (ev)=>{
        ev.preventDefault();
        const socket = io();
        socket.emit('message', {username: auth.username, text: message})
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
