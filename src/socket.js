
import io from "socket.io-client";
import { SOCKET_URL } from './server';

export const socket = io(SOCKET_URL,{
    autoConnect:false
});