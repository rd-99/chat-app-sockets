import  { useEffect, useRef, useState } from 'react';
import { sendMessage, sendUserTyping } from './TeleparthyImpl';
import { UserAuthContext } from '../pages/ProtectedRoute';
import Message from './Message';
import {
    SessionChatMessage,
  } from "teleparty-websocket-lib";
import { useChatStore } from '../store/useChatStore';
import AnyOneTypingCompoent from './AnyOneTyping';
// interface ChatBoxProps {
//     messages: string[];
//     onSendMessage: (message: string) => void;
// }

function ChatBox({ messages } : { messages: SessionChatMessage[] }) {
    const { user } = UserAuthContext();
    const [newMessage, setNewMessage] = useState('');
    const {nickName } = useChatStore.getState();
    const roomId = useChatStore.getState().room;
    const userTypingRef = useRef<NodeJS.Timeout | null>(null);

    const handleSendMessage = () => {
        if (newMessage.trim() !== '') {
            sendMessage(newMessage, user!.email, nickName);
            setNewMessage('');
        }
    };

    const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewMessage(e.target.value);

        if (userTypingRef.current) {
            clearTimeout(userTypingRef.current);
        }

        sendUserTyping(true, user!.email);

        userTypingRef.current = setTimeout(() => {
            sendUserTyping(false, user!.email);
        }, 1000);
    };

    useEffect(() => {
        return () => {
            if (userTypingRef.current) {
                clearTimeout(userTypingRef.current);
            }
        };
    }, []);

    return (
        <div>
        <div>
            <h1 className="text-2xl font-semibold">Chat Room: {roomId}</h1>
        </div>
        <AnyOneTypingCompoent />
        {/* {usersCurrentlyTyping.length>0 && <div>
            <h1 className="text-blue-700 font-semibold">Currently Typing: {
                usersCurrentlyTyping.join(', ')}</h1>
        </div>} */}
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
                    onChange={(e) => handleTyping(e)}
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
        </div>
    );
}

export default ChatBox;