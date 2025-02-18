import {
  TelepartyClient,
  SocketEventHandler,
  SocketMessageTypes,
  SessionChatMessage,
} from "teleparty-websocket-lib";
import { UserAuthContext } from "../pages/ProtectedRoute";
let isConnReady = false;
const eventHandler: SocketEventHandler = {
  onConnectionReady: () => {
    isConnReady = true;
  },
  onClose: () => {
    isConnReady = false;
  },
  onMessage: (message) => {
    switch (message.type) {
      case SocketMessageTypes.SEND_MESSAGE:
        console.log(message.data);
        break;

      case SocketMessageTypes.SET_TYPING_PRESENCE:
        console.log(message.data);
        break;

      case SocketMessageTypes.JOIN_SESSION:
        console.log(message.data);
        break;
    }
  },
};

export let client = new TelepartyClient(eventHandler);

export const createChatRoom = (nickname: string, roomName : string= Math.random().toString(36).substring(7)) => {
  if (isConnReady) {
    client.createChatRoom(nickname, roomName);
  } else {
    while (!isConnReady) {
        client = new TelepartyClient(eventHandler);
      setTimeout(() => {
        createChatRoom(nickname, roomName);
      }, 1000);
    }
  }
};

export const sendMessage = (message: string , nickname : string) => {
    const { user } = UserAuthContext();
  if (isConnReady) {
    client.sendMessage(SocketMessageTypes.SEND_MESSAGE, {
        body: message,
        permId: user.email,
        timestamp: Date.now(),
        isSystemMessage: false,
        userNickname : nickname
    } as SessionChatMessage);
  } else {
    while (!isConnReady) {
        client = new TelepartyClient(eventHandler);
      setTimeout(() => {
        sendMessage(message , nickname);
      }, 1000);
    }
  }
};

export const sendUserTyping = (isTyping: boolean) => {
    const { user } = UserAuthContext();
  if (isConnReady) {
    client.sendMessage(SocketMessageTypes.SET_TYPING_PRESENCE, {
      data: true,
      user: user.email,
    });
  } else {
    while (!isConnReady) {
      setTimeout(() => {
        sendUserTyping(isTyping);
      }, 1000);
    }
  }
};
