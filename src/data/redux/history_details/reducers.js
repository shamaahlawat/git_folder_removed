import actionTypes from '../actiontypes';
import states from './states';
import { MODULE_DATA } from '../../config/constants';

export default function history_details(state = states.history_details, action) {
    switch (action.type) {
        case actionTypes.UPDATE_SELECTED_DATE_RANGE:
            return {
                ...state,
                selected_date_range: action.payload ? [...action.payload] : [...state.selected_date_range]
            };

        case actionTypes.HISTORY_LOADING:
            return {
                ...state,
                loaders:{
                    ...state.loaders,
                    history_loading: true,
                    history_loaded: false,
                }
            };

        case actionTypes.HISTORY_RECEIVED:{
            let current_chat_history_details = {...state.current_chat_history_details};
            if(current_chat_history_details.active_chat_item){
                let index = action.payload.findIndex((item) => {return item.sessionId === current_chat_history_details.active_chat_item.sessionId});
                if(index === -1){
                    current_chat_history_details={
                        ...state.current_chat_history_details,
                        active_chat_item: null,
                        messages:[],
                        user_profile_details:{}
                    }
                }
            }

            return {
                ...state,
                chat_history_list: action.payload && action.payload.chatSessions ? [...action.payload.chatSessions] : [],
                load_more_history: action.payload && action.payload.chatSessions && action.payload.chatSessions.length === MODULE_DATA.HISTORY.LOAD_MORE_HISTORY_COUNT,
                current_chat_history_details,
                total_history_count: action.payload && action.payload.totalCount ? action.payload.totalCount : 0,
                loaders:{
                    ...state.loaders,
                    history_loading: false,
                    history_loaded: true,
                }
            };
        }

        case actionTypes.HISTORY_ERROR:
            return {
                ...state,
                loaders:{
                    ...state.loaders,
                    history_loading: false,
                    history_loaded: false,
                }
            };

        case actionTypes.MORE_HISTORY_RECEIVED:
            return {
                ...state,
                chat_history_list: action.payload && action.payload.chatSessions ? [...state.chat_history_list, ...action.payload.chatSessions] : [...state.chat_history_list],
                load_more_history: action.payload && action.payload.chatSessions && action.payload.chatSessions.length === MODULE_DATA.HISTORY.LOAD_MORE_HISTORY_COUNT,
            };
        
        case actionTypes.UPDATE_HISTORY_FILTER: {
            return {
                ...state,
                selected_filters: {
                    ...state.selected_filters,
                    [action.payload.filterKey]: action.payload.value
                }
            };
        }

        case actionTypes.REMOVE_HISTORY_FILTER_ITEM: {
            let selected_filters = { ...state.selected_filters };
            let array = selected_filters[action.payload.filterKey].filter((item) => { return item.id !== action.payload.id });

            return {
                ...state,
                selected_filters: {
                    ...state.selected_filters,
                    [action.payload.filterKey]: array
                }
            };
        }

        case actionTypes.CLEAR_HISTORY_FILTER: {
            return {
                ...state,
                selected_filters: {}
            };
        }
        
        case actionTypes.SET_CURRENT_HISTORY_CHAT_ITEM: {
            return {
                ...state,
                current_chat_history_details: {
                    ...state.current_chat_history_details,
                    active_chat_item: action.payload
                }
            };
        }    

        case actionTypes.GET_CURRENT_HISTORY_RECEIVED: {
            let current_chat_history_details = { ...state.current_chat_history_details };
            if (action.payload && action.payload.sessionId && action.payload.sessionId.trim().length > 0) {
                current_chat_history_details = {
                    ...state.current_chat_history_details,
                    messages: action.payload.chatLogs ? [...action.payload.chatLogs] : [],
                    user_profile_details: action.payload.userProfileDetails ? action.payload.userProfileDetails : {}
                };
            }
            return {
                ...state,
                current_chat_history_details,
            };
        }

        case actionTypes.GET_CURRENT_HISTORY_FAILED: {
            return {
                ...state,
                current_chat_history_details: {
                    ...state.current_chat_history_details,
                    active_chat_item: null,
                    messages: [],
                    user_profile_details: {}
                }
            };
        }
        
        case actionTypes.MESSAGE_NLP_SNAPSHOT_UPDATED: {
            let messages = [...state.current_chat_history_details.messages];
            
            if (action.payload && action.payload.chatLogId && action.payload.chatLogId.trim().length > 0) {
                const index = messages.findIndex((message) => { return (message.chatLogId && message.chatLogId === action.payload.chatLogId) });
                if (index !== -1) {
                    let updated_message = {
                        ...messages[index],
                    };
                    if (messages[index].prevNLPSnapshot) {
                        updated_message = {
                            ...messages[index],
                            NLPSnapshot: action.payload.NLPSnapshot
                        };
                    } else {
                        updated_message = {
                            ...messages[index],
                            prevNLPSnapshot: messages[index].NLPSnapshot ,
                            NLPSnapshot: action.payload.NLPSnapshot
                        };
                    }
                    
                    messages = [...state.current_chat_history_details.messages.slice(0, index), updated_message, ...state.current_chat_history_details.messages.slice(index+1)];
                }
            }

            return {
                ...state,
                current_chat_history_details: {
                    ...state.current_chat_history_details,
                    messages,
                }
            };
        }    

        default:
            return state;
    }
}
