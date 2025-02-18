import ChatBox from "../components/ChatBox";
import { useChatStore } from "../store/useChatStore";


function ChatRoom() {
    const messages = useChatStore((state) => state.messages);
    return ( 
    <div>
        <ChatBox messages={messages} />

    </div> );
}

export default ChatRoom;