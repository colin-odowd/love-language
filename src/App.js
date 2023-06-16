import logo from './logo.svg';
import './App.css';
import MessageForm from './MessageForm'; 
import { ref, onValue } from 'firebase/database';
import { db } from './firebase';
import { useEffect, useState } from 'react';

function App() {
  const [latestMessage, setLatestMessage] = useState('');

  useEffect(() => {
    const messagesRef = ref(db, 'messages');

    onValue(messagesRef, (snapshot) => {
      const messages = snapshot.val();
      console.log('Messages snapshot:', messages); // Add this line to check the snapshot data

      if (messages) {
        const messageKeys = Object.keys(messages);
        console.log('Message keys:', messageKeys); // Add this line to check the message keys

        const latestKey = messageKeys[messageKeys.length - 1];
        console.log('Latest key:', latestKey); // Add this line to check the latest key

        const latestMessage = messages[latestKey].message;
        console.log('Latest message:', latestMessage); // Add this line to check the latest message

        setLatestMessage(latestMessage);
      }
    });
  }, []);

  console.log('Latest message state:', latestMessage); // Add this line to check the latest message state

  return (
    <div className="App">
      <MessageForm />
      <h1 className="center">{latestMessage}</h1>
    </div>
  );
}

export default App;
