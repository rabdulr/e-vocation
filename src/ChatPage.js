import React, {useState, useEffect} from 'react';

const ChatPage = ({ auth, params, user, chatMessages, createChatMessage})=>{
    const [message, setMessage]= useState('')
    const messageObj = {senderId: auth.id, receiverId: params.id, username: auth.username, message: message};


    if (!params.id){
        params.id = "General Chat"
    }

    const onSubmit = (ev)=>{
        ev.preventDefault();
        setMessage('');
        createChatMessage({message, receiverId: user[0].id})
    }
    return(
        <div className = 'columnNW grow1 vh70'>
            <div className = 'columnNW borderDB bgBB border5 marginHalf vh70 grow1'>
                <h4 className = 'centerText colorOW padHalf'>Chat with { user.length > 0 ? user[0].username : '' }</h4>
                <ul id = 'messages' className = 'columnNW borderDB bgOW colorDB border10 marginHalf grow1 scrollable'>
                    {chatMessages.map((chatMessage, idx) =>{
                        return(
                            <li key={idx} className = 'rowNW'> <strong className = 'colorAO padQuarter topMarginHalf bottomMarginHalf leftMarginHalf rightPad1 leftPad1 topLeft15 bottomLeft15 bgDB'>{ chatMessage.senderId === auth.id ? auth.username : user[0].username }</strong><div className = { `padQuarter rightMarginHalf topMarginHalf bottomMarginHalf rightPad1 leftPad1 topRight15 bottomRight15 ${ chatMessage.senderId === auth.id ? 'bgBB colorOW' : 'bgAO colorDB' }` }>{ chatMessage.message }</div></li>
                        )
                    })}
                </ul>
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
