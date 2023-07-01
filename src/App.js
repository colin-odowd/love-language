import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from './firebase';
import './App.css';
import MessageForm from './MessageForm'; 
import MessageLog from './MessageLog';

function App() {
  const [latestMessage, setLatestMessage] = useState(null);

  useEffect(() => {
    const messagesRef = ref(db, 'messages');

    onValue(messagesRef, (snapshot) => {
      const messages = snapshot.val();

      if (messages) {
        const messageKeys = Object.keys(messages);
        const latestKey = messageKeys[messageKeys.length - 1];
        const latestMessage = messages[latestKey];
        setLatestMessage(latestMessage);
      }
    });
  }, []);

  return (
    <div className="App">
      <MessageForm />
      <div className="latest-message-container">
        {latestMessage?.image ? (
          <img src={latestMessage.image} alt="Latest message content" className='latest-message-image'/>
        ) : (
          <h1>{latestMessage?.message}</h1>
        )}
      </div>
      <MessageLog />
    </div>
  );
}

export default App;
