import actionTypes from '../actiontypes';
import states from './states';

export default function filter_details(state = states.filter_details, action) {
    switch (action.type) {
        case actionTypes.FILTERS_LOADING:
            return {
                ...state,
                loaders: {
                    ...state.loaders,
                    filters_loading: true,
                    filters_loaded: false
                }
            };

        case actionTypes.FILTERS_RECEIVED: {
            return {
                ...state,
                filters: [...action.payload],
                loaders: {
                    ...state.loaders,
                    filters_loading: false,
                    filters_loaded: true
                }
            };
        }

        case actionTypes.FILTERS_ERROR:
            return {
                ...state,
                loaders: {
                    ...state.loaders,
                    filters_loading: false,
                    filters_loaded: false
                }
            };

        default:
            return state;
    }
}
