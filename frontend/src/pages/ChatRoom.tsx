import ChatBox from "../components/Chatbox";
import SendMessage from "../components/SendMessage";



function ChatRoom() {
    return ( 
    <div>
        <ChatBox messages={["fjf" , "jned"]} />
        <SendMessage />

    </div> );
}

export default ChatRoom;