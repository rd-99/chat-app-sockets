
// export interface MessageProps {
//     message : {
//     body: string;
//     isSystemMessage: boolean;
//     messageId: string;
//     permId: string;
//     timestamp: number;
//     userSettings? : {
//         userIcon: string;
//         userNickname: string;
//     }
// }
// }

import {
    SessionChatMessage,
  } from "teleparty-websocket-lib";
import { useChatStore } from "../store/useChatStore";

function Message(message  : { message : SessionChatMessage }) {
    // console.log(message , 55);
    const msg = message.message;
    const { body,isSystemMessage,timestamp} = msg;
    
    const {nickName} = useChatStore.getState()
    const isOwnMessage = nickName === msg?.userNickname;
    return (
        <div className={`flex ${isSystemMessage ? 'justify-center' : isOwnMessage ? 'justify-end' : 'justify-start'} mb-2`}>
            <div className={`flex flex-col p-2 bg-amber-200 rounded-lg shadow-md ${isSystemMessage ? 'w-full' : 'max-w-xs'}`}>
                {!isSystemMessage && (
                    <div className="flex items-center justify-between mb-2">
                        <div className="font-semibold text-blue-600">{nickName}</div>
                        <div className="text-xs text-gray-500">{new Date(timestamp).toLocaleTimeString()}</div>
                    </div>
                )}
                <div className={`text-sm ${isSystemMessage ? 'text-gray-500 italic' : 'text-gray-800'}`}>
                    {body}
                </div>
            </div>
        </div>
    );
    // return (
    //     <div className="flex flex-col p-4 mb-2 bg-amber-200 rounded-lg shadow-md">
    //         <div className="flex items-center justify-between mb-2">
    //             <div className="flex items-center">
    //                 <div className="font-semibold text-blue-600">{nickName}</div>
    //             </div>
    //             <div className="text-xs text-gray-500">{new Date(timestamp).toLocaleTimeString()}</div>
    //         </div>
    //         <div className={`text-sm ${isSystemMessage ? 'text-gray-500 italic' : 'text-gray-800'}`}>
    //             {body}
    //         </div>
    //     </div>
    // );
}

export default Message;