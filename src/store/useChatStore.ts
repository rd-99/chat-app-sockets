import { create } from "zustand";
import { sendUserTyping } from "../components/TeleparthyImpl";
import { ChatState } from "../../types";
//import { MessageProps } from "../components/Message";


export const useChatStore = create<ChatState>((set) => ({
    messages: [],
    nickName : Math.random().toString(36).substring(7),
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
    setNickName: (nickName) => set({ nickName }),
    usersCurrentlyTyping: [],
    setUsersCurrentlyTyping: (usersCurrentlyTyping) => set({ usersCurrentlyTyping})}
));