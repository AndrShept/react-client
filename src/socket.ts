import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = import.meta.env.SOCKET_SERVER;

export const socket = io(URL!);
