import React, { useEffect, useState } from 'react';
import { db, analytics } from './firebase';
import { ref, push, set } from 'firebase/database';



function MessageLog() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const messageRef = firebase.database().ref('messages');
        messageRef.on('value', (snapshot) => {
            const messages = snapshot.val();
            const newState = [];
            for (let message in messages) {
                newState.push({
                    id: message,
                    message: messages[message].message,
                    timestamp: messages[message].timestamp
                });
            }
            setMessages(newState);
        });
    }, []);

    return (
        <div style={{ overflow: 'auto', maxHeight: '200px' }}>
            <table>
                <thead>
                    <tr><th>Messages Log</th></tr>
                </thead>
                <tbody>
                    {messages.map((message) => (
                        <tr key={message.id}><td>{message.message}</td></tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

export default MessageLog;
