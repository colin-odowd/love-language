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
        <table>
          <tbody>
            {messages.map((message) => (
              <tr key={message.id}>
                <td>{message.date}</td>
                <td>{message.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No messages found.</p>
      )}
    </div>
  );
}

export default MessageLog;
