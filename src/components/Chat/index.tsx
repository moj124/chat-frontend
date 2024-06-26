import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { User } from '../../util/types';

import styles from './index.module.css';


interface ChatProps {
  user: User;
  onLogout: () =>  void;
}

const SystemMessage = {
  id: 1,
  body: 'Welcome to the Nest Chat app',
  userId: 100,
};

const socket = io(process.env.REACT_APP_API_URL as string, { autoConnect: false });

function Chat ({ user, onLogout }: ChatProps) {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([SystemMessage]);

  useEffect(() => {
    socket.connect();

    socket.on('connect', () => {
      console.log('Socket connected');
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    socket.on('chat', (newMessage) => {
      console.log('New message added', newMessage);
      setMessages((previousMessages) => [...previousMessages, newMessage]);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('chat');
    };
  }, []);

  const handleSendMessage = (e: any) => {
    if (e.key !== 'Enter' || inputValue.trim().length === 0) return;

    // send a message to the server
    socket.emit('chat', { userId: user.id, body: inputValue.trim() });
    setInputValue('');
  };

  const handleLogout = () => {
    socket.disconnect(); // disconnect when we do logout
    onLogout();
  };



  return (
    <div className={styles.chat}>
    <div className={styles.chatHeader}>
      <span>Nest Chat App</span>
      <button className={styles.button} onClick={handleLogout}>
        Logout
      </button>
    </div>
    <div className={styles.chatMessageList}>
      {messages.map((message, idx) => (
        <div
          key={idx}
          className={`${styles.chatMessage} ${
            user.id === message.userId ? styles.outgoing : null
          }`}
        >
          <div className={styles.chatMessageWrapper}>
            <span className={styles.chatMessageAuthor}>{message.userId}</span>
            <div className={styles.chatMessageBubble}>
              <span className={styles.chatMessageBody}>{message.body}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
    <div className={styles.chatComposer}>
      <input
        className={styles.chatComposerInput}
        placeholder="Type message here"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleSendMessage}
      />
    </div>
  </div>
  )
}

export default Chat;
