import React, { useState, useEffect } from 'react';
import { ref, push, set, get, child, onValue, increment } from 'firebase/database';
import { db } from './firebase';

function MessageForm() {
    const [message, setMessage] = useState('');
    const [count, setCount] = useState(0);

    useEffect(() => {
        const messagesRef = ref(db, 'messages');

        // Fetch the current count from the database
        get(child(messagesRef, 'count')).then((snapshot) => {
            if (snapshot.exists()) {
                setCount(snapshot.val());
            }
        });

        // Real-time listener to keep the count up to date
        onValue(child(messagesRef, 'count'), (snapshot) => {
            if (snapshot.exists()) {
                setCount(snapshot.val());
            }
        });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        const messagesRef = ref(db, 'messages');

        // Push the new message and update the count
        const newMessageRef = push(messagesRef);
        set(newMessageRef, {
            message: message,
            date: new Date().toISOString()
        });

        const countRef = child(messagesRef, 'count');
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
