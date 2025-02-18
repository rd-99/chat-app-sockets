import { create } from "zustand";
import { sendUserTyping } from "../components/TeleparthyImpl";
import { MessageProps } from "../components/Message";

interface ChatState {
    messages: MessageProps[];
    room : string;
    addMessage: (message: MessageProps) => void;
    setMessages: (messages: MessageProps[]) => void;
    setRoom: (room: string) => void;
}

export const useChatStore = create<ChatState>((set) => ({
    messages: [],
    room : '',
    addMessage: (message) => set((state) => (
        {  messages: [...state.messages, message] }
    )),
    setMessages: (messages) => {
        const msgs = messages.messages;
        console.log("Setting messages" , messages.messages);
        set({ msgs })
    },
    setRoom: (room)  => set({ room }),
    sendUserTyping: () => sendUserTyping(true , "email"),
}));