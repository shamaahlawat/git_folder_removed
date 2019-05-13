import actionTypes from '../actiontypes';
import states from './states';

export default function dashboard_details(state = states.dashboard_details, action) {
    switch (action.type) {
        case actionTypes.DASHBOARD_SOCKET_CONNECTED: {
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
            
        case actionTypes.DASHBOARD_SOCKET_CONNECT_ERROR: {
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

        case actionTypes.DASHBOARD_SOCKET_ERROR: {
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
        
        case actionTypes.LIVE_COUNT_PER_SEC: {
            let live_count = [...action.payload];
            let live_traffic_per_sec = [...state.live_traffic_per_sec];
            if (live_traffic_per_sec.length >= (60 * live_count.length)) {
                live_traffic_per_sec = [...state.live_traffic_per_sec.slice(live_count.length)]
            }
            live_traffic_per_sec = [...live_traffic_per_sec, ...action.payload ];
            return {
                ...state,
                live_count,
                live_traffic_per_sec,
            };
        }  
        
        case actionTypes.LAST_N_HOURS_TIME_SERIES: {
            return {
                ...state,
                live_traffic_per_min:[...action.payload],
            };
        }    
        
        case actionTypes.LIVE_COUNT_PER_MIN: {
            let live_traffic_per_min = [...state.live_traffic_per_min];
            if (live_traffic_per_min.length >= (60 * action.payload.length)) {
                live_traffic_per_min = [...state.live_traffic_per_min.slice(action.payload.length)]
            }
            live_traffic_per_min = [...live_traffic_per_min, ...action.payload];
            return {
                ...state,
                live_traffic_per_min,
            };
        }   
        
        case actionTypes.UPDATE_SCALE_PER_MIN: {
            return {
                ...state,
                live_traffic_scale_per_min: {
                    ...state.live_traffic_scale_per_min,
                    timestamp: {
                        ...state.live_traffic_scale_per_min.timestamp,
                        tickInterval: action.payload ? 60 * 15 * 1000 * action.payload : 60 * 15 * 1000
                    }
                },
            };
        } 

        default:
            return state;
    }
}
