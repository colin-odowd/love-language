import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from './firebase';
import './App.css';
import MessageForm from './MessageForm'; 
import MessageLog from './MessageLog';
import vines from './vines.png';
import vines_flip from './vines_flip.png';


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
      <div className="header"> 
        <img src={vines_flip} />
        <div className="title"> Leah's Affirmations of Love </div>
        <img src={vines} />
      </div>
      <MessageForm />
      <div className="latest-message-container">
        {latestMessage?.image ? (
          <img src={latestMessage.image} alt="Latest message content" className='latest-message-image'/>
        ) : (
          <div className="latest-message">{latestMessage?.message}</div>
        )}
      </div>
      <MessageLog />
    </div>
  );
}

export default App;
