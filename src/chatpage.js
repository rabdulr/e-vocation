import React, {useState, useEffect} from 'react';

const ChatPage = ({chatMessages, setChatMessages, displayChat, socket, auth})=>{
    const [message, setMessage]= useState('')
    //console.log(auth)

    const onSubmit = (ev)=>{
        ev.preventDefault();
        const socket = io();
        socket.emit('message', {username: auth.username, text: message})
        setMessage('');
    }
    return(
        <div className = 'columnNW maxWidth5'>
            <h3 className = 'centerText'>Chat with { auth.id }</h3>
            <div className = 'borderDB bgBB border5 marginHalf heighthundred'>
                <ul id = 'messages' className = 'borderDB marginHalf bgOW colorDB border10 scrollable padHalf maxHeight3'></ul>
                <form onSubmit={onSubmit} className = 'columnNW leftMarginHalf rightMarginHalf'>
                    <div className = 'rowNW widthundred'>
                        <input onChange= {({ target })=>setMessage(target.value) } value = {message} className = 'bottomLeft10 topLeft10 bgOW colorDB borderDB leftPadHalf widthundred' />
                        <input type = 'submit' className = 'bgOW colorDB borderDB bottomRight10 topRight10' value = 'Send' />    
                    </div>
                </form>
            </div>    
        </div>   
    )
}

export default ChatPage
