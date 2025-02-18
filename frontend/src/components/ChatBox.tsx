import  { useState } from 'react';
import { sendMessage } from './TeleparthyImpl';
import { UserAuthContext } from '../pages/ProtectedRoute';
import Message from './Message';
import {
    SessionChatMessage,
  } from "teleparty-websocket-lib";
// interface ChatBoxProps {
//     messages: string[];
//     onSendMessage: (message: string) => void;
// }

function ChatBox({ messages } : { messages: SessionChatMessage[] }) {
    const { user } = UserAuthContext();
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = () => {
        if (newMessage.trim() !== '') {
            sendMessage(newMessage , user!.email,"nick");
            setNewMessage('');
        }
    };

    return (
        <div className="w-full p-8 bg-amber-500 rounded-lg shadow-md">
            <div className="flex flex-col gap-2 mb-4">
                {messages.map((message, index) => (
                    <Message key={index} message={message} />
                ))}
            </div>
            <div className="flex bg-amber-50">
                <input
                    type="text"
                    placeholder="Type a message"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-grow px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleSendMessage}
                    className="px-4 py-2 text-white bg-blue-500 rounded-r-lg hover:bg-blue-700"
                >
                    Send 
                </button>
            </div>
        </div>
    );
}

export default ChatBox;