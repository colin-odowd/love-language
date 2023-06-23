import './MessageLog.css';
import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from './firebase';

function MessageLog() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const messagesRef = ref(db, 'messages');

    onValue(messagesRef, (snapshot) => {
      const messagesData = snapshot.val();
      if (messagesData) {
        const messageList = Object.entries(messagesData).map(([key, value]) => ({
          id: key,
          message: value.message,
          date: formatDate(value.date),
        }));
        setMessages(messageList);
      }
    });
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="MessageLog">
      {messages.length > 0 ? (
        messages.map((message) => (
          <div key={message.id} className='message-container'>
            <div className='date'>{message.date}</div>
            <div className='message'>{message.message}</div>
          </div>            
        ))
      ) : (
        <p>No messages found.</p>
      )}
    </div>
  );
  
  
}

export default MessageLog;
