import React, {useState, useEffect} from 'react';
import axios from 'axios';

const ChatPage = ({ chatWith, chatMessages, createChatMessage, auth })=>{
  const [message, setMessage]= useState('');
  let el;

  //use to scroll to top when chatMessages save
  useEffect(()=> {
    if(el){
      el.scrollTop = el.scrollHeight
    }
  }, [chatMessages, el]);
  
  const onSubmit = (ev)=> {
    ev.preventDefault();
    createChatMessage({ message, receiverId: chatWith.id });
  };

  //if chatWith is not loaded yet, return, it will be loaded
  if(!chatWith){
    return null;
  }

  return(
      <div className = 'columnNW grow1 vh80'>
          <div className = 'columnNW borderDB bgBB border5 marginHalf vh80 grow1'>
              <h4 className = 'centerText colorOW padHalf'>Chat with {chatWith.username } </h4>
              <ul ref={ ref => el = ref } id = 'messages' className = 'columnNW borderDB bgOW colorDB border10 marginHalf grow1 vh80 scrollable'>
                {
                  chatMessages.map( chatMessage => {
                    return (
                      <li className='padHalf' key={ chatMessage.id }>
                        <strong>{chatMessage.senderId === auth.id ? auth.username: chatWith.username }</strong> { chatMessage.message }
                      </li>
                    );
                  })
                }
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
