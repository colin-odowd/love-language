import React, { useState } from 'react';
import { ref, push, set } from 'firebase/database';
import { db } from './firebase';
import { getStorage, ref as stRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage'; 
import { v4 as uuidv4 } from 'uuid';

import './MessageForm.css';

function MessageForm() {
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const messagesRef = ref(db, 'messages');
    const newMessageRef = push(messagesRef);
    let imageUrl = "";

    if(image) {
      const storage = getStorage();
      const imageName = uuidv4();
      const storageRef = stRef(storage, `images/${imageName}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      await uploadTask.then(async () => {
        await getDownloadURL(storageRef).then((downloadURL) => {
          imageUrl = downloadURL;
        });
      });
    }

    set(newMessageRef, {
      message: message,
      image: imageUrl,
      date: new Date().toISOString()
    });

    setImage(null);
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit} className="message-form">
      <label>
        <input type="text" className="message-input" value={message} onChange={(e) => setMessage(e.target.value)} />
      </label>
      <input type="file" onChange={handleImageChange} />
      <input type="submit" value="Submit" className="submit-button" />
    </form>
  );
}

export default MessageForm;
