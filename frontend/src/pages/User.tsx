function User() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="mb-8 text-3xl font-bold text-gray-700">Welcome to the Chat App</h1>
            <div className="flex gap-4">
                <button
                    className="px-6 py-3 text-white bg-emerald-400 rounded-lg hover:bg-blue-700"
                    onClick={() => alert('Create Chatroom functionality to be implemented')}
                >
                    Create New Chatroom
                </button>
                <button
                    className="px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-700"
                    onClick={() => alert('Join Chatroom functionality to be implemented')}
                >
                    Join Current Chatroom
                </button>
            </div>
        </div>
    );
}

export default User;