import React, {useEffect,useState} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import './Chat.css';
import { useLocation } from 'react-router-dom';

const Chat = ({location}) => {     
    
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const serverPort = 'localhost:5000';
    let socket;
    
    useEffect(() => {
       const {name,number} = queryString.parse(location.search);

        socket = io(serverPort);
        setName(name);
        setNumber(number);
        
        socket.emit('new-user', name);

        socket.on('chat-message', message => {
          appendMessage(message);
        });

        socket.on('connection', name =>{
          appendMessage(name +'connected');
        })

        socket.on('user-disconnected', name =>{
          appendMessage(name +'disconnected');
        })

        const messageContainer = document.getElementById('messageContainer');
        const sendContainer = document.getElementById('sendContainer');
        const messageInput = document.getElementById('messageInput');
        const sendButton = document.getElementById('sendButton');

        sendContainer.addEventListener('submit', (event) => {
          event.preventDefault();
          const message = messageInput.value;
          socket.emit('send-chat-message', message);
          messageInput.value = '';
        });

        const appendMessage = (message) => {  
        const msgElement = document.createElement('div');
        msgElement.setAttribute('class','msgElements');
        msgElement.innerText = message;
        messageContainer.appendChild(msgElement);
        } 

        sendButton.addEventListener('click', (event) => {
          if(messageInput.value !== ''){
            appendMessage(messageInput.value);
          }
        })

   },[serverPort, location.search]);  

    return (
    <div id="outerChatContainer">  
     <div class="heading">Happy Shopping</div>
       <div id="messageContainer"></div>
         <form id="sendContainer">   
           <input type="text" id="messageInput"/>
           <button type="submit" id="sendButton">Send</button>
         </form> 
    </div>   
    )
};

export default Chat;