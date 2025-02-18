import { useState } from "react";
import { client, createChatRoom } from "../components/TeleparthyImpl";
import { useNavigate } from "react-router-dom";



function User() {
    const navigate = useNavigate();

    const [newNickname, setNewNickname] = useState('');
    const [existingNickname, setExistingNickname] = useState('');
    const [roomId, setRoomId] = useState('');

    const handleCreateChatroom = () => {
        if(newNickname !== '') {
        client.createChatRoom(newNickname , "");
        }else{
            setNewNickname(Math.random().toString(36).substring(7));
            client.createChatRoom(newNickname , "");
        }
        createChatRoom(newNickname);
        navigate('/chatroom');
    };

    const handleJoinChatroom = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Join Chatroom functionality to be implemented with room ID: ${roomId}`);
    };
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="mb-8 text-3xl font-bold text-gray-700">Welcome to Chat App</h1>
            <div className="flex flex-row gap-4">
                <div className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Enter your nickname"
                    value={newNickname}
                    onChange={(e) => setNewNickname(e.target.value)}
                    className="px-4 py-2 border rounded-lg"
                />
                <button
                    className="px-6 py-3 text-white bg-emerald-400 rounded-lg hover:bg-blue-700"
                    onClick={handleCreateChatroom}
                >
                    Create New Chatroom
                </button>
                </div>
            
                <form onSubmit={handleJoinChatroom} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Enter room ID"
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                        className="px-4 py-2 border rounded-lg"
                    />
                    <input
                    type="text"
                    placeholder="Enter your nickname"
                    value={existingNickname}
                    onChange={(e) => setExistingNickname(e.target.value)}
                    className="px-4 py-2 border rounded-lg"
                />
                    <button
                        type="submit"
                        className="px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-700"
                    >
                        Join Current Chatroom
                    </button>
                </form>

            </div>
        </div>
    );
}

export default User;