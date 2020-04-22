import React, {useState, useEffect} from 'react';

const ChatPage = ({ chatMessages, setChatMessages, displayChat, socket, auth })=>{
    const [message, setMessage]= useState('')

    const onSubmit = (ev)=>{
        ev.preventDefault();
        const socket = io();
        socket.emit('message', {username: auth.username, text: message});
        setMessage('');
    }
    return(
        <div className = 'columnNW grow1 vh80'>
            <div className = 'columnNW borderDB bgBB border5 marginHalf vh80 grow1'>
                <h4 className = 'centerText colorOW padHalf'>Chat with { auth.id }</h4>
                <ul id = 'messages' className = 'columnNW borderDB bgOW colorDB border10 marginHalf grow1 vh80 scrollable'></ul>
                <form onSubmit={onSubmit} className = 'columnNW leftMarginHalf rightMarginHalf'>
                    <div className = 'rowNW widthundred'>
                        <input onChange= {({ target })=>setMessage(target.value) } value = {message} placeholder = 'Type a Message...' className = 'bottomLeft10 topLeft10 bgOW colorDB borderDB leftPadHalf widthundred' />
                        <input type = 'submit' className = 'bgOW colorDB borderDB bottomRight10 topRight10' value = 'Send' disabled = { !message }/>    
                    </div>
                </form>
            </div>    
        </div>   
    )
}

export default ChatPage
