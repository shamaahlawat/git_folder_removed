import * as API from '../../config/api';
import actionTypes from '../actiontypes';
import { refreshPage } from '../../config/utils';

export function loginUser(payload, callback) {
    return (dispatch) => {
        dispatch({
            type: actionTypes.LOGIN_START
        });
        
        API.loginUser(payload, (error, response) => {
            if (!error) {
                dispatch({
                    type: actionTypes.LOGIN_SUCCESS,
                    payload: response,
                });
                callback();
            }
            else {
                dispatch({
                    type: actionTypes.LOGIN_ERROR
                });
            }
        });
    };
}

export function logoutUser() {
    return (dispatch) => {
        dispatch({
            type: actionTypes.LOGOUT_USER
        })
        refreshPage();
    };
}
