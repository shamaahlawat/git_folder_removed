import socketIOClient from 'socket.io-client';

import actionTypes from '../actiontypes';
import { SOCKET_EVENTS } from '../../config/constants';
import { showMessage, getAuthSocketData } from '../../config/utils';
import * as URLS from '../../config/urls';

export function registerConservationSocketListener() {
    return function (dispatch) {
        const AUTH_SOCKET_DATA = getAuthSocketData();
        const socket = socketIOClient.connect(URLS.BASE_SOCKET_URL, AUTH_SOCKET_DATA);

        socket.on(SOCKET_EVENTS.CONNECT, () => {
            // console.log('socket connected');

            dispatch({
                type: actionTypes.CONVERSATION_SOCKET_CONNECTED,
                payload: socket
            });
        });

        socket.on(SOCKET_EVENTS.CONNECT_ERROR, () => {
            // console.log('socket connection error');
            dispatch({
                type: actionTypes.CONVERSATION_SOCKET_CONNECT_ERROR
            });
        });

        socket.on(SOCKET_EVENTS.ERROR, (err) => {
            showMessage('error', err && err.trim().length > 0 ? err : 'socket error...');
            dispatch({
                type: actionTypes.CONVERSATION_SOCKET_ERROR,
            });
        });

        socket.on(SOCKET_EVENTS.ADDITION, (response) => {
            console.log('addition', response);

            dispatch({
                type: actionTypes.CONVERSATION_ADDITION,
                payload: response,
            });
        });

        socket.on(SOCKET_EVENTS.DELETION, (response) => {
            console.log('deletion', response);

            dispatch({
                type: actionTypes.CONVERSATION_DELETION,
                payload: response,
            });
        });

        socket.on(SOCKET_EVENTS.UPDATION, (response) => {
            console.log('updation', response);

            dispatch({
                type: actionTypes.CONVERSATION_UPDATION,
                payload: response,
            });
        });

        socket.on(SOCKET_EVENTS.USER_MESSAGE, (response) => {
            console.log('user_message: ', response);

            dispatch({
                type: actionTypes.USER_MESSAGE_RECEIVED,
                payload: response,
            });
        });

        socket.on(SOCKET_EVENTS.RESPONSE, (response) => {
            console.log('bot_message: ', response);

            dispatch({
                type: actionTypes.BOT_MESSAGE_RECEIVED,
                payload: response,
            });
        });
    };
}

export function setCurrentChatItem(payload) {
    return function (dispatch) {
        dispatch({
            type: actionTypes.CURRENT_CHAT_ITEM,
            payload,
        });
    }
}

export function joinedToChatroom(payload) {
    console.log('joined to chatroom: ');

    return function (dispatch) {
        dispatch({
            type: actionTypes.JOINED_TO_CHATROOM,
            payload,
        });
    }
}

export function chatOverTaken(payload) {
    console.log('chatOverTaken: ', payload);

    return function (dispatch) {
        dispatch({
            type: actionTypes.CHAT_OVERTAKEN,
            payload,
        });
    }
}

export function chatRelinquish(payload) {
    console.log('chatRelinquish: ', payload);

    return function (dispatch) {
        dispatch({
            type: actionTypes.CHAT_RELINQUISH,
            payload,
        });
    }
}

export function updateConversationFilterSelection(payload) {
    console.log('update filter: ', payload);

    return function (dispatch) {
        dispatch({
            type: actionTypes.UPDATE_CONVERSATION_FILTER,
            payload,
        });
    }
}

export function removeConversationFilterItem(payload) {
    console.log('remove filter item: ', payload);

    return function (dispatch) {
        dispatch({
            type: actionTypes.REMOVE_CONVERSATION_FILTER_ITEM,
            payload,
        });
    }
}

export function clearConversationFilter() {
    return function (dispatch) {
        dispatch({
            type: actionTypes.CLEAR_CONVERSATION_FILTER,
        });
    }
}

export function handleChatInterfaceVisibility(payload) {
    return function (dispatch) {
        dispatch({
            type: actionTypes.HANDLE_CHAT_INTERFACE_VISIBILITY,
            payload,
        });
    }
}

export function clearActiveChatDetails() {
    return function (dispatch) {
        dispatch({
            type: actionTypes.CLEAR_ACTIVE_CHAT_DETAILS,
        });
    }
}