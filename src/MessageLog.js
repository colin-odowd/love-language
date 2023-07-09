import './App.css';
import './MessageLog.css';
import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { getStorage, getDownloadURL } from 'firebase/storage';
import { db } from './firebase';
import { storage } from './firebase';


function MessageLog() {
  const [messages, setMessages] = useState([]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    const messagesRef = ref(db, 'messages');

    onValue(messagesRef, (snapshot) => {
      const messagesData = snapshot.val();
      console.log('messagesData:', messagesData); // Add this line to log messagesData to the console
      if (messagesData) {
        const messageList = Object.entries(messagesData).map(([key, value]) => {
          console.log('key:', key); // Add this line to log the key to the console
          console.log('value:', value); // Add this line to log the value to the console
          let image = value.image;
          return {
            id: key,
            message: value.message,
            date: formatDate(value.date),
            image,
          };
        });
        console.log('messageList:', messageList); // Add this line to log the messageList to the console
        setMessages(messageList);
      }
    });
    
  }, []);

  return (
    <div className="MessageLog">
      {messages.length > 0 ? (
        messages.map((message) => (
          <div key={message.id} className='message-container'>
            <div className='date'>{message.date}</div>
            {message.image ? (
              <div className="image-container">
                <img src={message.image} alt="message content" className='message-image'/>
              </div>
            ) : (
              <div className='message'>{message.message}</div>
            )}
          </div>
        ))
      ) : (
        <div className='no-messages'>No Messages Found</div>
      )}
    </div>
  );
}

export default MessageLog;
