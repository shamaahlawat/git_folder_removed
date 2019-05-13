import * as API from '../../config/api';
import actionTypes from '../actiontypes';

export function getAllIntents() {
    return function (dispatch) {
        dispatch({
            type: actionTypes.INTENTS_LOADING
        });

        API.getAllIntents((error, response) => {
            if (!error) {
                dispatch({
                    type: actionTypes.INTENTS_RECEIVED,
                    payload: response,
                });
            }
            else {
                dispatch({
                    type: actionTypes.INTENTS_ERROR,
                });
            }
        });
    };
}

export function getAllEntities() {
    return function (dispatch) {
        dispatch({
            type: actionTypes.ENTITIES_LOADING
        });

        API.getAllEntities((error, response) => {
            if (!error) {
                dispatch({
                    type: actionTypes.ENTITIES_RECEIVED,
                    payload: response,
                });
            }
            else {
                dispatch({
                    type: actionTypes.ENTITIES_ERROR,
                });
            }
        });
    };
}

export function createUtterance(payload, callback) {
    return function (dispatch) {
        dispatch({
            type: actionTypes.NLP_SNAPSHOT_UPDATING,
        });

        API.createUtterance(payload, (error, response) => {
            if (!error) {
                dispatch({
                    type: actionTypes.MESSAGE_NLP_SNAPSHOT_UPDATED,
                    payload: response
                });

                dispatch({
                    type: actionTypes.NLP_SNAPSHOT_UPDATED,
                });

                if(callback){callback();}
            }
            else {
                dispatch({
                    type: actionTypes.NLP_SNAPSHOT_UPDATION_ERROR,
                });
            }
        });
    };
}
