import socketIOClient from 'socket.io-client';
import * as URLS from './urls';
import { getAuthSocketData } from './utils';

export const connectSocket = () => {
    const AUTH_SOCKET_DATA = getAuthSocketData();
    const socket = socketIOClient.connect(URLS.BASE_SOCKET_URL, AUTH_SOCKET_DATA);

    return {
        on: function (eventName, callback) {
            socket.on(eventName, callback);
        },
        emit: function (eventName, data) {
            socket.emit(eventName, data);
        },
        socket_data: socket
    };
};
