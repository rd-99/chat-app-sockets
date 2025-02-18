
export interface MessageProps {
    message : {
    body: string;
    isSystemMessage: boolean;
    messageId: string;
    permId: string;
    timestamp: number;
    userSettings? : {
        userIcon: string;
        userNickname: string;
    }
}
}

function Message(message : MessageProps) {
    const msg = message.message;
    const { body,isSystemMessage,timestamp,userSettings} = msg;
    console.log("Message" , message);
    return (
        <div className="flex flex-col p-4 mb-2 bg-amber-200 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                    <div className="font-semibold text-blue-600">{userSettings?.userNickname}</div>
                </div>
                <div className="text-xs text-gray-500">{new Date(timestamp).toLocaleTimeString()}</div>
            </div>
            <div className={`text-sm ${isSystemMessage ? 'text-gray-500 italic' : 'text-gray-800'}`}>
                {body}
            </div>
        </div>
    );
}

export default Message;