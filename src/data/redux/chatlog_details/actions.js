import actionTypes from '../actiontypes';
import * as API from '../../config/api';

export function updateMessageFilter(payload, path) {
    return function (dispatch) {
        dispatch({
            type: actionTypes.UPDATE_MESSAGE_FILTER,
            payload,
            path
        });
    };
}

export function getMessageTimeSeries(payload) {
    return function (dispatch) {
        dispatch({
            type: actionTypes.PAGE_LOADING,
            payload: "loading"
        });

        API.getMessageTimeSeries(payload, (error, response) => {
            console.log('res', response)
            if (!error) {
                dispatch({
                    type: actionTypes.MESSAGE_TIME_SERIES_RECEIVED,
                    payload: response,
                });
            }
            dispatch({
                type: actionTypes.PAGE_LOADED,
            });
        });
    };
}
