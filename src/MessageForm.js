import React, { useState } from 'react';
import { ref, push, set, increment } from 'firebase/database';
import { db } from './firebase';

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

        // Update the message count
        const countRef = ref(db, 'count');
        set(countRef, increment(1));

        setMessage('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Message:
                <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
            </label>
            <input type="submit" value="Submit" />
        </form>
    );
}

export default MessageForm;
