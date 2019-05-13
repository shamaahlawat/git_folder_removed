import actionTypes from '../actiontypes';
import states from './states';

export default function page_details(state = states.page_details, action) {
    switch (action.type) {
        case actionTypes.SYST_LANG_SET:
            return {
                ...state,
                lang: action.payload.lang
            };

        case actionTypes.DEVICE_DATA_LOADED:
            return {
                ...state,
                device_data: action.payload.device_data
            };

        case actionTypes.PAGE_CHANGED:
            return {
                ...state,
                current_page: action.payload.current_page,
                page_title: action.payload.page_title,
                page_load_error: false,
            };
        
        case actionTypes.PAGE_LOADING:
            return {
                ...state,
                loaders: {
                    ...state.loaders,
                    page_loading: true,
                    page_loading_text: action.payload ? action.payload : ""
                }
            };
        
        case actionTypes.PAGE_LOADED:
            return {
                ...state,
                loaders: {
                    ...state.loaders,
                    page_loading: false,
                    page_loading_text: ""
                }
            };

        default:
            return state;
    }
}
