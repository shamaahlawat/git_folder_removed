import actionTypes from '../actiontypes';
import states from './states';
import dotProp from 'dot-prop-immutable';

export default function chatlog_details(state = states.chatlog_details, action) {
    switch (action.type) {
        case actionTypes.UPDATE_MESSAGE_FILTER: {
            let current_state = { ...state };

            if (action.path === "message_filters.granularity") {
                const hour = 60 * 60 * 1000;
                current_state = {
                    ...state,
                    message_scale: {
                        ...state.message_scale,
                        timestamp: {
                            ...state.message_scale.timestamp,
                            tickInterval: action.payload === "day" ? hour * 24 : (action.payload === "week" ? hour * 24 * 7 : (action.payload === "month" ? hour * 24 * 15 : hour * 6)),
                            mask: action.payload === "hour" ? 'HH:mm' : 'DD MMM',
                        }
                    },
                }
            }
            return dotProp.set(current_state, action.path, action.payload);
        }

        case actionTypes.MESSAGE_TIME_SERIES_RECEIVED: {
            return {
                ...state,
                message_time_series: action.payload && action.payload.messagesTimeSeries ? action.payload.messagesTimeSeries : [...state.message_time_series]
            };
        }

        default:
            return state;
    }
}
