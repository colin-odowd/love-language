import React, { useState, useRef } from 'react';
import { ref, push, set } from 'firebase/database';
import { db } from './firebase';
import { getStorage, ref as stRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

import './MessageForm.css';

function MessageForm() {
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const messagesRef = ref(db, 'messages');
    const newMessageRef = push(messagesRef);
    let imageUrl = '';

    if (image) {
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
      date: new Date().toISOString(),
    });

    setImage(null);
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit} className="message-form">
      <div className="form-input">
        <input type="text" className="message-input" value={message} onChange={(e) => setMessage(e.target.value)} />
        <input type="submit" value="Submit" className="submit-button" />
        <button type="button" className="file-upload-button" onClick={handleButtonClick}>
          File
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          accept="image/*"
          style={{ display: 'none' }}
        />
      </div>
    </form>
  );
}

export default MessageForm;
