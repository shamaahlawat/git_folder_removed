import actionTypes from '../actiontypes';
import states from './states';
import dotProp from 'dot-prop-immutable';
import React from 'react';
import moment from 'moment';

export default function usage_details(state = states.usage_details, action) {
    switch (action.type) {
        case actionTypes.UPDATE_CHAT_SESSION_FILTER: {
            let lstate = { ...state };

            if (action.path === "chat_session_filters.granularity") {
                const hour = 60 * 60 * 1000;
                lstate = {
                    ...state,
                    chat_session_scale: {
                        ...state.chat_session_scale,
                        timestamp: {
                            ...state.chat_session_scale.timestamp,
                            tickInterval: action.payload === "day" ? hour * 24 : (action.payload === "week" ? hour * 24 * 7 : (action.payload === "month" ? hour * 24 * 15 : hour * 6)),
                            mask: action.payload === "hour" ? 'HH:mm' : 'DD MMM',
                        }
                    },
                }
            }
            return dotProp.set(lstate, action.path, action.payload);
        }

        case actionTypes.CHAT_SESSION_RECEIVED: {
            return {
                ...state,
                chat_session_time_series: action.payload && action.payload.chatSessionsTimeSeries ? action.payload.chatSessionsTimeSeries : [...state.chat_session_time_series]
            };
        }

        case actionTypes.USER_ENGAGEMENT_STATS_LOADING: {
            return {
                ...state,
                loaders: {
                    ...state.loaders,
                    user_stats_loading: true,
                    user_stats_loaded: false
                }
            };
        }

        case actionTypes.USER_ENGAGEMENT_STATS_RECEIVED: {
            console.log('user engage', action.payload);

            return {
                ...state,
                user_engagement_stats: action.payload && action.payload.metrics ? action.payload.metrics : [...state.user_engagement_stats],
                loaders: {
                    ...state.loaders,
                    user_stats_loading: false,
                    user_stats_loaded: true
                }
            };
        }

        case actionTypes.USER_ENGAGEMENT_STATS_ERROR: {
            return {
                ...state,
                loaders: {
                    ...state.loaders,
                    user_stats_loading: false,
                    user_stats_loaded: false
                }
            };
        }
        
        case actionTypes.UPDATE_USER_RETENTION_FILTER: {
            return dotProp.set(state, action.path, action.payload);
        }    

        case actionTypes.USER_RETENTION_LOADING: {
            return {
                ...state,
                loaders: {
                    ...state.loaders,
                    user_retention_loading: true,
                    user_retention_loaded: false
                }
            };
        }

        case actionTypes.USER_RETENTION_RECEIVED: {
            let cohorts_columns = [...state.user_retention.cohorts_columns];
            let cohorts_data = [...state.user_retention.cohorts_data];
            if (action.payload && action.payload.cohortsColumns && action.payload.cohortsData) {
                action.payload.cohortsColumns.forEach((col) => {
                    if (col.key && col.key === 'New Users') {
                        col.render = text => <p className="ori-font-sm ori-font-bold">{text}</p> ;
                        if(action.payload.cohortsColumns.length > 21){
                            col.fixed = true;
                        }
                    }
                    if(col.key === 'Date' && action.payload.cohortsColumns.length > 21){
                        col.fixed = true;
                    }
                });
                action.payload.cohortsData.forEach((data)=>{
                    if(data.Date){
                        data.Date = moment(data.Date).format('DD MMM YYYY');
                    }
                });
                cohorts_columns = [...action.payload.cohortsColumns];
                cohorts_data = [...action.payload.cohortsData];
            }
            return {
                ...state,
                user_retention: {
                    ...state.user_retention,
                    cohorts_columns,
                    cohorts_data,
                },
                loaders: {
                    ...state.loaders,
                    user_retention_loading: false,
                    user_retention_loaded: true
                }
            };
        }

        case actionTypes.USER_RETENTION_ERROR: {
            return {
                ...state,
                loaders: {
                    ...state.loaders,
                    user_retention_loading: false,
                    user_retention_loaded: false
                }
            };
        }

        default:
            return state;
    }
}
