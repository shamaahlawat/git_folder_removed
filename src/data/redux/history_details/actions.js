import * as API from '../../config/api';
import actionTypes from '../actiontypes';

export function updateSelectedDateRange(payload) {
    return function (dispatch) {
        dispatch({
            type: actionTypes.UPDATE_SELECTED_DATE_RANGE,
            payload
        });
    };
}

export function getChatHistory(payload) {
    return function (dispatch) {
        dispatch({
            type: actionTypes.HISTORY_LOADING
        });

        API.getChatHistory(payload, (error, response) => {
            if (!error) {
                dispatch({
                    type: actionTypes.HISTORY_RECEIVED,
                    payload: response,
                });
            }
            else {
                dispatch({
                    type: actionTypes.HISTORY_ERROR,
                });
            }
        });
    };
}

export function loadMoreHistory(payload) {
    return function (dispatch) {
        API.getChatHistory(payload, (error, response) => {
            console.log('response', response);

            if (!error) {
                dispatch({
                    type: actionTypes.MORE_HISTORY_RECEIVED,
                    payload: response,
                });
            }
        });
    };
}

export function updateHistoryFilterSelection(payload) {
    return function (dispatch) {
        dispatch({
            type: actionTypes.UPDATE_HISTORY_FILTER,
            payload,
        });
    }
}

export function removeHistoryFilterItem(payload) {
    return (dispatch) => {
        dispatch({
            type: actionTypes.REMOVE_HISTORY_FILTER_ITEM,
            payload
        });
        return Promise.resolve();
    }
}

export function clearHistoryFilter() {
    return function (dispatch) {
        dispatch({
            type: actionTypes.CLEAR_HISTORY_FILTER,
        });
    }
}

export function setCurrentHistoryChatItem(payload) {
    return function (dispatch) {
        dispatch({
            type: actionTypes.SET_CURRENT_HISTORY_CHAT_ITEM,
            payload,
        });
    }
}

export function getCurrentChatHistory(payload) {
    return function (dispatch) {
        dispatch({
            type: actionTypes.PAGE_LOADING
        });

        API.getCurrentChatHistory(payload, (error, response) => {
            dispatch({
                type: actionTypes.PAGE_LOADED
            });

            if (!error) {
                dispatch({
                    type: actionTypes.GET_CURRENT_HISTORY_RECEIVED,
                    payload: response,
                });
            } else {
                dispatch({
                    type: actionTypes.GET_CURRENT_HISTORY_FAILED,
                    payload: response,
                });
            }
        });
    };
}