import socketIOClient from 'socket.io-client';

import actionTypes from '../actiontypes';
import { SOCKET_EVENTS } from '../../config/constants';
import { showMessage, getAuthSocketData } from '../../config/utils';
import * as URLS from '../../config/urls';
import isEmpty from 'lodash/isEmpty';

export function registerDashboardSocketListener() {
    return (dispatch) => {
        const AUTH_SOCKET_DATA = getAuthSocketData();
        const socket = socketIOClient.connect(URLS.SOCKET_URLS.LIVE_STATISTICS_SOCKET_URL, AUTH_SOCKET_DATA);
        
        socket.on(SOCKET_EVENTS.CONNECT, () => {
            dispatch({
                type: actionTypes.DASHBOARD_SOCKET_CONNECTED,
                payload: socket
            });
        });

        socket.on(SOCKET_EVENTS.CONNECT_ERROR, () => {
            dispatch({
                type: actionTypes.DASHBOARD_SOCKET_CONNECT_ERROR
            });
        });

        socket.on(SOCKET_EVENTS.ERROR, (err) => {
            showMessage('error', err && err.trim().length > 0 ? err : 'connection error...');
            dispatch({
                type: actionTypes.DASHBOARD_SOCKET_ERROR,
            });
        });

        socket.on(SOCKET_EVENTS.PER_SECOND_STATS, (response) => {
            
            if (response && response.liveCount && !isEmpty(response.liveCount)) {
                // console.log('live count', response);
                dispatch({
                    type: actionTypes.LIVE_COUNT_PER_SEC,
                    payload: response.liveCount
                });
            }
        });

        socket.on(SOCKET_EVENTS.LAST_N_HOURS_TIME_SERIES, (response) => {
            // console.log('last n hours:', response);
            if (response && response.timeSeries && !isEmpty(response.timeSeries)) {
                dispatch({
                    type: actionTypes.LAST_N_HOURS_TIME_SERIES,
                    payload: response.timeSeries
                });
            }
        });

        socket.on(SOCKET_EVENTS.PER_MINUTE_STATS, (response) => {
            // console.log('live count per min', response);
            if (response && response.liveCount && !isEmpty(response.liveCount)) {
                dispatch({
                    type: actionTypes.LIVE_COUNT_PER_MIN,
                    payload: response.liveCount
                });
            }
        });
    };
}

export function updateScalePerMin(payload) {
    return function (dispatch) {
        dispatch({
            type: actionTypes.UPDATE_SCALE_PER_MIN,
            payload,
        });
    }
}
