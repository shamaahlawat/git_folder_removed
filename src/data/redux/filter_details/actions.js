import * as API from '../../config/api';
import actionTypes from '../actiontypes';

export function getFiltersData() {
    return function (dispatch) {
        dispatch({
            type: actionTypes.FILTERS_LOADING
        });
        
        API.getFiltersData((error, response) => {
            if (!error) {
                dispatch({
                    type: actionTypes.FILTERS_RECEIVED,
                    payload: response,
                });
            }
            else {
                dispatch({
                    type: actionTypes.FILTERS_ERROR,
                });
            }
        });
    };
}
