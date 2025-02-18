import {
  TelepartyClient,
  SocketEventHandler,
  SocketMessageTypes,
  SessionChatMessage,
} from "teleparty-websocket-lib";
import { useChatStore } from "../store/useChatStore";
let isConnReady = false;
const eventHandler: SocketEventHandler = {
  onConnectionReady: () => {
    isConnReady = true;
  },
  onClose: () => {
    isConnReady = false;
  },
  onMessage: (message) => {
    console.log(message , 55);
    const addMsg = useChatStore.getState().addMessage;
    if(message.type === "sendMessage"){
        addMsg(message.data);
    }
    
  },
};

export let client = new TelepartyClient(eventHandler);

export const createChatRoom =async (nickname: string, roomName : string= Math.random().toString(36).substring(7)) => {
  if (isConnReady) {
    const roomId=await client.createChatRoom(nickname, roomName);
    console.log(roomId , 39929);
  } else {
    const interval = setInterval(() => {
        if (isConnReady) {
          client.createChatRoom(nickname, roomName);
          clearInterval(interval);
        }
      }, 1000);
  }
};

export const sendMessage = (message: string , email:string , nickname : string) => {
    
  if (isConnReady) {
    client.sendMessage(SocketMessageTypes.SEND_MESSAGE, {
        body: message,
        permId: email,
        timestamp: Date.now(),
        isSystemMessage: false,
        userNickname : nickname,
    } as SessionChatMessage);
  } else {
    const interval = setInterval(() => {
        if (isConnReady) {
          client.sendMessage(SocketMessageTypes.SEND_MESSAGE, {
            body: message,
            permId: email,
            timestamp: Date.now(),
            isSystemMessage: false,
            userNickname: nickname,
          } as SessionChatMessage);
          clearInterval(interval);
        }
      }, 1000);
  }
};

export const sendUserTyping = (isTyping: boolean , email:string
) => {
  if (isConnReady) {
    client.sendMessage(SocketMessageTypes.SET_TYPING_PRESENCE, {
      data: isTyping,
      user: email,
    });
  } else {
    const interval = setInterval(() => {
        if (isConnReady) {
          client.sendMessage(SocketMessageTypes.SET_TYPING_PRESENCE, {
            data: true,
            user: email,
          });
          clearInterval(interval);
        }
      }, 1000);
  }
};

export const joinChatRoom = async (nickname: string , roomId: string,) => {
    const messages = useChatStore.getState().setMessages;
    if (isConnReady) {
        const f = await client.joinChatRoom(nickname, roomId , "");
        console.log(f , 399239999);
        messages(f.messages);

    } else {
        while (!isConnReady) {
            client = new TelepartyClient(eventHandler);
        setTimeout(() => {
            joinChatRoom(nickname, roomId);
        }, 1000);
        }
    }
}