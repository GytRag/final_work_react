import  {io} from 'socket.io-client'


// export const socket = io('http://213.136.82.182:3011');
// export const socket = io('http://localhost:3011');
export const socket = io('https://thecode.lt', {
    path: '/socket.io',
    transports: ['websocket'],
    secure: true
});
