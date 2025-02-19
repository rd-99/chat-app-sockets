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
     //console.log(message , 55);
     if(Object.prototype.hasOwnProperty.call(message, "data") && message.data?.body){
      const data = message.data.body;
      switch (data){
      case "created the party🎉":
        message.data.body = `${message.data?.userNickname} - created the party🎉`;
        break;
      case "joined the party🎉":
        console.log(message , 4555);
        message.data.body = `${message.data?.userNickname} - joined the party🎉`;
        break;
      case "left the party🎉":
        message.data.body = `${message.data?.userNickname} - left the party🎉`;
        break;
        default:
          break;
     }
    }
    const addMsg = useChatStore.getState().addMessage;
    if(message.type === "sendMessage"){
        addMsg(message.data);
    }
    
  },
};

export let client = new TelepartyClient(eventHandler);




export const createChatRoom =async (nickname: string, roomName : string= Math.random().toString(36).substring(7)) => {
  console.log(nickname , roomName);
  if (isConnReady) {
    const roomId=await client.createChatRoom(nickname, roomName);
    console.log(roomId , 39929);
    return roomId;
  } else {
    const interval = setInterval(async () => {
        if (isConnReady) {
          const roomId1= client.createChatRoom(nickname, roomName);
          console.log(roomId1 , 39929);
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
        client.sendMessage(SocketMessageTypes.JOIN_SESSION , {
            user: nickname,
        })
        console.log(f , "rommId");
        messages(f.messages);
        return 

    } else {
        while (!isConnReady) {
            client = new TelepartyClient(eventHandler);
        setTimeout(() => {
            joinChatRoom(nickname, roomId);
        }, 1000);
        }
    }
}