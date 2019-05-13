import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import page_details from './page_details/reducers';
import admin_details from './admin_details/reducers';
import filter_details from './filter_details/reducers';
import conversation_details from './conversation_details/reducers';
import history_details from './history_details/reducers';
import nlp_details from './nlp_details/reducers';
import dashboard_details from './dashboard_details/reducers';
import usage_details from './usage_details/reducers';
import chatlog_details from './chatlog_details/reducers';
import session_flow_details from './session_flow_details/reducers';

const rootReducer = combineReducers({
    page_details,
    admin_details,
    filter_details,
    conversation_details,
    history_details,
    nlp_details,
    dashboard_details,
    usage_details,
    chatlog_details,
    session_flow_details,
    routing: routerReducer
});

export default rootReducer;