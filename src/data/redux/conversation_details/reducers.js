import actionTypes from '../actiontypes';
import states from './states';
import { MESSAGE_SENDER } from '../../config/constants';
import { getLocalAdminDetails } from '../../config/utils';

export default function conversation_details(state = states.conversation_details, action) {

    switch (action.type) {
        case actionTypes.CONVERSATION_SOCKET_CONNECTED: {
            return {
                ...state,
                socket_details: {
                    ...state.socket_details,
                    socket: action.payload,
                    connectivity: {
                        ...state.socket_details.connectivity,
                        is_socket_connected: true,
                    }
                }
            };
        }

        case actionTypes.CONVERSATION_SOCKET_CONNECT_ERROR: {
            return {
                ...state,
                socket_details: {
                    ...state.socket_details,
                    connectivity: {
                        ...state.socket_details.connectivity,
                        is_socket_connected: false,
                    }
                }
            };
        }

        case actionTypes.CONVERSATION_SOCKET_ERROR: {
            return {
                ...state,
                socket_details: {
                    ...state.socket_details,
                    connectivity: {
                        ...state.socket_details.connectivity,
                        is_socket_connected: false,
                    }
                }
            };
        }

        case actionTypes.CONVERSATION_ADDITION: {
            const adminDetails = getLocalAdminDetails();
            const admin_id = adminDetails && adminDetails.admin_id ? adminDetails.admin_id : null;
            if (admin_id === null) { document.location.reload(); }
            let live_chat_details = { ...state.live_chat_details };
            let overtaken_chat_details = { ...state.overtaken_chat_details };
            let active_chat_details = { ...state.active_chat_details };

            if (action.payload && action.payload.liveChatsDetails) {
                live_chat_details = action.payload.liveChatsDetails.filter((item) => { return item && item.overtakenAdminId !== admin_id }).reduce((obj, item) => (obj[item.psid] = item, obj), {});
                overtaken_chat_details = action.payload.liveChatsDetails.filter((item) => { return item && item.overtakenAdminId === admin_id }).reduce((obj, item) => (obj[item.psid] = item, obj), {});
            }
            if (action.payload && action.payload.newLiveUser) {
                if (action.payload.newLiveUser.overtakenAdminId && action.payload.newLiveUser.overtakenAdminId === admin_id) {
                    overtaken_chat_details = {
                        [action.payload.newLiveUser.psid]: action.payload.newLiveUser,
                        ...state.overtaken_chat_details,
                    }
                } else {
                    live_chat_details = {
                        [action.payload.newLiveUser.psid]: action.payload.newLiveUser,
                        ...state.live_chat_details
                    }
                }
            }
            if (action.payload && action.payload.newBotEvent && action.payload.newBotEvent.psid) {
                if (Object.keys(live_chat_details).findIndex((psid) => { return action.payload.newBotEvent.psid === psid }) !== -1) {
                    live_chat_details = {
                        ...state.live_chat_details,
                        [action.payload.newBotEvent.psid]: {
                            ...state.live_chat_details[action.payload.newBotEvent.psid],
                            botEvents: [action.payload.newBotEvent, ...state.live_chat_details[action.payload.newBotEvent.psid].botEvents]
                        }
                    }
                    
                }
                if (Object.keys(overtaken_chat_details).findIndex((psid) => { return action.payload.newBotEvent.psid === psid }) !== -1) {
                    overtaken_chat_details = {
                        ...state.overtaken_chat_details,
                        [action.payload.newBotEvent.psid]: {
                            ...state.overtaken_chat_details[action.payload.newBotEvent.psid],
                            botEvents: [action.payload.newBotEvent, ...state.overtaken_chat_details[action.payload.newBotEvent.psid].botEvents]
                        }
                    }
                    
                }
                if (active_chat_details.active_chat_item && active_chat_details.active_chat_item.psid && action.payload.newBotEvent.psid === active_chat_details.active_chat_item.psid) {
                    active_chat_details = {
                        ...state.active_chat_details,
                        user_profile_details: {
                            ...state.active_chat_details.user_profile_details,
                            botEvents:[action.payload.newBotEvent, ...state.active_chat_details.user_profile_details.botEvents]
                        }
                    }
                }
            }
            return {
                ...state,
                live_chat_details,
                overtaken_chat_details,
                active_chat_details
            };
        }

        case actionTypes.CONVERSATION_DELETION: {
            let live_chat_details = { ...state.live_chat_details };
            let overtaken_chat_details = { ...state.overtaken_chat_details };
            let active_chat_details = { ...state.active_chat_details };

            if (action.payload && action.payload.usersDisconnected && action.payload.usersDisconnected.length > 0) {
                action.payload.usersDisconnected.forEach(disconnectedItem => delete live_chat_details[disconnectedItem.psid]);
                action.payload.usersDisconnected.forEach(disconnectedItem => delete overtaken_chat_details[disconnectedItem.psid]);
                if (state.active_chat_details.active_chat_item && action.payload.usersDisconnected.findIndex((disconnectedItem) => { return (disconnectedItem.psid === state.active_chat_details.active_chat_item.psid) }) !== -1) {
                    active_chat_details = {
                        ...state.active_chat_details,
                        active_chat_item: null,
                        messages: [],
                        user_profile_details: {}
                    };
                }
            }

            return {
                ...state,
                live_chat_details,
                overtaken_chat_details,
                active_chat_details,
            };
        }

        case actionTypes.CONVERSATION_UPDATION: {
            let live_chat_details = { ...state.live_chat_details };
            let overtaken_chat_details = { ...state.overtaken_chat_details };
            let active_chat_details = { ...state.active_chat_details };

            if (action.payload.changedUserDetails && action.payload.changedUserDetails.psid) {
                if (Object.keys(live_chat_details).findIndex((psid) => { return action.payload.changedUserDetails.psid === psid }) !== -1) {
                    live_chat_details = {
                        ...state.live_chat_details,
                        [action.payload.changedUserDetails.psid]: {
                            ...state.live_chat_details[action.payload.changedUserDetails.psid],
                            ...action.payload.changedUserDetails
                        }
                    }
                    
                }
                if (Object.keys(overtaken_chat_details).findIndex((psid) => { return action.payload.changedUserDetails.psid === psid }) !== -1) {
                    overtaken_chat_details = {
                        ...state.overtaken_chat_details,
                        [action.payload.changedUserDetails.psid]: {
                            ...state.overtaken_chat_details[action.payload.changedUserDetails.psid],
                            ...action.payload.changedUserDetails
                        }
                    }
                }
                if (active_chat_details.active_chat_item && active_chat_details.active_chat_item.psid && active_chat_details.active_chat_item.psid === action.payload.changedUserDetails.psid) {
                    active_chat_details = {
                        ...state.active_chat_details,
                        active_chat_item: {
                            ...state.active_chat_details.active_chat_item,
                            ...action.payload.changedUserDetails
                        }
                    }
                }
            }
            if (action.payload.changedUserProfileDetails && action.payload.changedUserProfileDetails.psid && active_chat_details.active_chat_item && active_chat_details.active_chat_item.psid && active_chat_details.active_chat_item.psid === action.payload.changedUserProfileDetails.psid) {
                active_chat_details = {
                    ...state.active_chat_details,
                    user_profile_details: {
                        ...state.active_chat_details.user_profile_details,
                        ...action.payload.changedUserProfileDetails.userProfileDetails
                    }
                }
            }
            return {
                ...state,
                live_chat_details,
                overtaken_chat_details,
                active_chat_details
            };
        }

        case actionTypes.CURRENT_CHAT_ITEM: {
            return {
                ...state,
                active_chat_details: {
                    ...state.active_chat_details,
                    active_chat_item: action.payload
                },
            };
        }

        case actionTypes.JOINED_TO_CHATROOM: {
            return {
                ...state,
                active_chat_details: {
                    ...state.active_chat_details,
                    messages: action.payload.activeChatSessionLogs ? action.payload.activeChatSessionLogs : [...state.active_chat_details.messages],
                    user_profile_details: action.payload && action.payload.userProfileDetails ? action.payload.userProfileDetails : { ...state.active_chat_details.user_profile_details },
                }
            };
        }

        case actionTypes.USER_MESSAGE_RECEIVED: {
            let message = {
                payload: { text: action.payload.userMessage },
                type: "text",
                sender: MESSAGE_SENDER.CUSTOMER
            }

            if (action.payload && action.payload.NLPSnapshot) {
                message = {
                    ...message,
                    NLPSnapshot: action.payload.NLPSnapshot,
                    prevNLPSnapshot: null,
                }
            }

            if ( action.payload && action.payload.prevNLPSnapshot) {
                message = {
                    ...message,
                    prevNLPSnapshot: action.payload.prevNLPSnapshot,
                }
            }

            return {
                ...state,
                active_chat_details: {
                    ...state.active_chat_details,
                    messages: [...state.active_chat_details.messages, message]
                }
            };
        }

        case actionTypes.BOT_MESSAGE_RECEIVED: {
            let message = action.payload.result.bot_messages[0];

            return {
                ...state,
                active_chat_details: {
                    ...state.active_chat_details,
                    messages: [...state.active_chat_details.messages, message]
                }
            };
        }

        case actionTypes.CHAT_OVERTAKEN: {
            let live_chat_details = { ...state.live_chat_details };
            let overtaken_chat_details = { ...state.overtaken_chat_details };
            let overtaken_item = live_chat_details[action.payload.psid];
            if (overtaken_item) {
                delete live_chat_details[action.payload.psid];
                overtaken_chat_details = {
                    [action.payload.psid]: overtaken_item,
                    ...state.overtaken_chat_details,
                };
            }
            return {
                ...state,
                live_chat_details,
                overtaken_chat_details,
            };
        }

        case actionTypes.CHAT_RELINQUISH: {
            let live_chat_details = { ...state.live_chat_details };
            let overtaken_chat_details = { ...state.overtaken_chat_details };
            let relinquish_item = overtaken_chat_details[action.payload.psid];
            if (relinquish_item) {
                delete overtaken_chat_details[action.payload.psid];
                live_chat_details = {
                    [action.payload.psid]: relinquish_item,
                    ...state.live_chat_details,
                };
            }
            return {
                ...state,
                live_chat_details,
                overtaken_chat_details,
            };
        }

        case actionTypes.UPDATE_CONVERSATION_FILTER: {
            return {
                ...state,
                selected_filters: {
                    ...state.selected_filters,
                    [action.payload.filterKey]: action.payload.value
                }
            };
        }

        case actionTypes.REMOVE_CONVERSATION_FILTER_ITEM: {
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

        case actionTypes.CLEAR_CONVERSATION_FILTER: {
            return {
                ...state,
                selected_filters: {}
            };
        }

        case actionTypes.HANDLE_CHAT_INTERFACE_VISIBILITY: {
            return {
                ...state,
                is_chatinterface_visible: action.payload,
            };
        }

        case actionTypes.CLEAR_ACTIVE_CHAT_DETAILS: {
            return {
                ...state,
                active_chat_details: {
                    ...state.active_chat_details,
                    active_chat_item: null,
                    messages: [],
                    user_profile_details: {}
                },
            };
        }
        
        case actionTypes.MESSAGE_NLP_SNAPSHOT_UPDATED: {
            let messages = [...state.active_chat_details.messages];

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
                            prevNLPSnapshot: messages[index].NLPSnapshot,
                            NLPSnapshot: action.payload.NLPSnapshot
                        };
                    }
                    messages = [...state.active_chat_details.messages.slice(0, index), updated_message, ...state.active_chat_details.messages.slice(index + 1)];
                }
            }

            return {
                ...state,
                active_chat_details: {
                    ...state.active_chat_details,
                    messages,
                }
            };
        }        

        default:
            return state;
    }
}
