import React, { useState } from 'react';
import { ref, push, set, increment } from 'firebase/database';
import { db } from './firebase';
import './MessageForm.css'; // Add this line

function MessageForm() {
    const [message, setMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const messagesRef = ref(db, 'messages');

        // Push the new message
        const newMessageRef = push(messagesRef);
        set(newMessageRef, {
            message: message,
            date: new Date().toISOString()
        });

        setMessage('');
    };

    return (
        <form onSubmit={handleSubmit} className="message-form">
            <label>
                <input type="text" className="message-input" value={message} onChange={(e) => setMessage(e.target.value)} />
            </label>
            <input type="submit" value="Submit" className="submit-button" />
        </form>
    );
}

export default MessageForm;
