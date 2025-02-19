import { ReactNode } from "react";
import { SessionChatMessage } from "teleparty-websocket-lib";

export interface ProtectedRoutesProps {
    children: ReactNode;
  }
export interface UserContextType {
    user: User | null;
    signin: (params: SignInParam) => Promise<void>;
    signout: () => Promise<void>;
    setUser: (user: User) => void;
  }

export interface User {
    email: string;
}

export interface SignInParam {
    email: string;
    password: string;
}
export interface ChatState {
    messages: SessionChatMessage[];
    room : string;
    addMessage: (message: SessionChatMessage) => void;
    setMessages: (messages: SessionChatMessage[]) => void;
    setRoom: (room: string) => void;
    nickName : string;
    setNickName: (nickName: string) => void;
    sendUserTyping: () => void;
    
}