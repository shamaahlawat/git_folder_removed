import actionTypes from '../actiontypes';
import * as API from '../../config/api';

export function updateChatSessionFilter(payload, path) {
    return function (dispatch) {
        dispatch({
            type: actionTypes.UPDATE_CHAT_SESSION_FILTER,
            payload,
            path
        });
    };
}

export function getChatSessionTimeSeries(payload) {
    return function (dispatch) {
        dispatch({
            type: actionTypes.PAGE_LOADING,
            payload: "session loading"
        });

        API.getChatSessionTimeSeries(payload, (error, response) => {
            if (!error) {
                dispatch({
                    type: actionTypes.CHAT_SESSION_RECEIVED,
                    payload: response,
                });
            }
            dispatch({
                type: actionTypes.PAGE_LOADED,
            });
        });
    };
}

export function getUserEngagementStats(payload) {
    return function (dispatch) {
        dispatch({
            type: actionTypes.USER_ENGAGEMENT_STATS_LOADING,
        });

        API.getUserEngagementStats(payload, (error, response) => {
            if (!error) {
                dispatch({
                    type: actionTypes.USER_ENGAGEMENT_STATS_RECEIVED,
                    payload: response,
                });
            } else {
                dispatch({
                    type: actionTypes.USER_ENGAGEMENT_STATS_ERROR,
                });
            }
        });
    };
}

export function updateUserRetentionFilter(payload, path) {
    return function (dispatch) {
        dispatch({
            type: actionTypes.UPDATE_USER_RETENTION_FILTER,
            payload,
            path
        });
    };
}

export function getUserRetention(payload, callback) {
    return function (dispatch) {
        dispatch({
            type: actionTypes.USER_RETENTION_LOADING,
        });

        API.getUserRetention(payload, (error, response) => {
            if (!error) {
                dispatch({
                    type: actionTypes.USER_RETENTION_RECEIVED,
                    payload: response,
                });
                if(callback){
                    callback();
                }
            } else {
                dispatch({
                    type: actionTypes.USER_RETENTION_ERROR,
                });
            }
        });
    };
}