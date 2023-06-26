import logo from './logo.svg';
import './App.css';
import MessageForm from './MessageForm'; 
import MessageLog from './MessageLog';

import { ref, onValue } from 'firebase/database';
import { db } from './firebase';
import { useEffect, useState } from 'react';

function App() {
  const [latestMessage, setLatestMessage] = useState('');

  useEffect(() => {
    const messagesRef = ref(db, 'messages');

    onValue(messagesRef, (snapshot) => {
      const messages = snapshot.val();

      if (messages) {
        const messageKeys = Object.keys(messages);
        const latestKey = messageKeys[messageKeys.length - 1];
        const latestMessage = messages[latestKey].message;
        setLatestMessage(latestMessage);
      }
    });
  }, []);

  console.log('Latest message state:', latestMessage); // Add this line to check the latest message state

  return (
    <div className="App">
      <MessageForm />
      <h1 className="center">{latestMessage}</h1>
      <MessageLog />
    </div>
  );
}

export default App;
