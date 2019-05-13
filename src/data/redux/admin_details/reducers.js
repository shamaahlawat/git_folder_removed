import actionTypes from '../actiontypes';
import states from './states';
import { LOCAL_STORAGE } from '../../config/constants';

export default function admin_details(state = states.admin_details, action) {
    switch (action.type) {
        case actionTypes.LOGIN_START:
            return {
                ...state,
                loaders: {
                    ...state.loaders,
                    logging: true,
                    login_success: false
                }
            };

        case actionTypes.LOGIN_SUCCESS: {
            let oriAdminDetails = {
                admin_id: action.payload.psid,
                token: action.payload.token,
                user_info: action.payload.userInfo,
            };
            localStorage.setItem(LOCAL_STORAGE.ORI_ADMIN, JSON.stringify(oriAdminDetails));
            return {
                ...state,
                admin_id: action.payload.psid,
                token: action.payload.token,
                user_info: action.payload.userInfo,
                loaders: {
                    ...state.loaders,
                    logging: false,
                    login_success: true
                }
            };
        }

        case actionTypes.LOGIN_ERROR:
            return {
                ...state,
                loaders: {
                    ...state.loaders,
                    logging: false,
                    login_success: false
                }
            };
        
        case actionTypes.LOGOUT_USER: {
            localStorage.removeItem(LOCAL_STORAGE.ORI_ADMIN);
            
            return {
                ...state,
                admin_id: null,
                token: null,
            };
        }
            
        default:
            return state;
    }
}
