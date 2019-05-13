import actionTypes from '../actiontypes';
import * as API from '../../config/api';

export function updateSessionFlowFilter(payload, path) {
    return function (dispatch) {
        dispatch({
            type: actionTypes.UPDATE_SESSION_FLOW_FILTER,
            payload,
            path
        });
    };
}

export function getSessionFlowData(payload, callback) {
    return function (dispatch) {
        dispatch({
            type: actionTypes.PAGE_LOADING,
            payload: "session loading"
        });

        API.getSessionFlowData(payload, (error, response) => {
            console.log('session flow res:', response);
            
            if (!error) {
                dispatch({
                    type: actionTypes.SESSION_FLOW_LOADED,
                    payload: response,
                });
                if(callback){
                    callback();
                }
            }
            dispatch({
                type: actionTypes.PAGE_LOADED,
            });
        });
    };
}
