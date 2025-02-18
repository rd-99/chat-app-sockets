import { create } from "zustand";
import { sendUserTyping } from "../components/TeleparthyImpl";
//import { MessageProps } from "../components/Message";
import {SessionChatMessage} from "teleparty-websocket-lib";
interface ChatState {
    messages: SessionChatMessage[];
    room : string;
    addMessage: (message: SessionChatMessage) => void;
    setMessages: (messages: SessionChatMessage[]) => void;
    setRoom: (room: string) => void;
}

export const useChatStore = create<ChatState>((set) => ({
    messages: [],
    room : '',
    addMessage: (message) => set((state) => (
        {  messages: [...state.messages, message] }
    )),
    setMessages: (messages) => {
        console.log("Setting messages" , messages);
        set({ messages })
    },
    setRoom: (room)  => set({ room }),
    sendUserTyping: () => sendUserTyping(true , "email"),
}));