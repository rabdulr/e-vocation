import React, {useState, useEffect} from 'react';
import axios from 'axios';

const ChatPage = ({displayChat, socket, auth, params, user})=>{
    const [message, setMessage]= useState('')
    const messageObj = {senderId: auth.id, receiverId: params.id, username: auth.username, message: message};

    if (!params.id){
        params.id = "General Chat"
    }

    //get chat history from db upon launch
    useEffect( () => {
        axios.get(`/api/chats/getChats/${auth.id}/${params.id}`)
        .then((chatHistory) =>{
            let chatArray = chatHistory.data
            let chatObj ={};

            //display chat history
            chatArray.forEach(chat =>{
                (chat.senderId === auth.id ? chatObj = {username: auth.username, message: chat.message, senderId: chat.senderId, receiverId: chat.receiverId }
                    : chatObj = {username: user[0].username, message: chat.message, senderId: chat.senderId, receiverId: chat.receiverId })
                displayChat(chatObj, auth)
            })
        })
    }, []);

    const onSubmit = (ev)=>{
        ev.preventDefault();
        const socket = io();
        socket.emit('message', messageObj);
        setMessage('');

        //put message in db if direct message
        if(params.id !== 'General Chat'){
            axios.post('/api/chats/createChat', messageObj)
        }
    }
    return(
        <div className = 'columnNW grow1 vh80'>
            <div className = 'columnNW borderDB bgBB border5 marginHalf vh80 grow1'>
                <h4 className = 'centerText colorOW padHalf'>Chat with { params.id }</h4>
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
