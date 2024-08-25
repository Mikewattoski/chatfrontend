import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8080/ws');

        ws.onmessage = (event) => {
            const msg = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, msg]);
        };

        return () => ws.close();
    }, []);

    const sendMessage = () => {
        const ws = new WebSocket('ws://localhost:8080/ws');
        ws.onopen = () => {
            ws.send(JSON.stringify({ username, message }));
            setMessage('');
        };
    };

    return (
        <div className="App">
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="text"
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
           
            <div class="container" >
            {messages.map((msg, index) => (
                    <div class="container">
                    <div key={index}>
                        <strong>{msg.username}: </strong>
                        <p>{msg.message}</p>
                    </div>
                    </div>
                ))}
            </div>

        </div>

    );
}

export default App;
