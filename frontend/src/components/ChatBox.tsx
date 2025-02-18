import React, { useState } from 'react';

interface ChatBoxProps {
    messages: string[];
    onSendMessage: (message: string) => void;
}

function ChatBox({ messages, onSendMessage }: ChatBoxProps) {
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = () => {
        if (newMessage.trim() !== '') {
            onSendMessage(newMessage);
            setNewMessage('');
        }
    };

    return (
        <div className="w-full p-8 bg-amber-500 rounded-lg shadow-md">
            <div className="flex flex-col gap-2 mb-4">
                {messages.map((message, index) => (
                    <div key={index} className="p-2 bg-gray-200 rounded-lg">
                        {message}
                    </div>
                ))}
            </div>
            <div className="flex">
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