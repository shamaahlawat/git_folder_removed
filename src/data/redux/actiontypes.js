const actionTypes = {
    //------------ page_details --------------

    SYST_LANG_SET: "SYST_LANG_SET",
    DEVICE_DATA_LOADED: "DEVICE_DATA_LOADED",
    PAGE_CHANGED: "PAGE_CHANGED",
    PAGE_LOAD_ERROR: "PAGE_LOAD_ERROR",
    USER_LOCATION_LOADED: "USER_LOCATION_LOADED",
    PAGE_LOADING: "PAGE_LOADING",
    PAGE_LOADED: "PAGE_LOADED",
    LOGOUT_USER: "LOGOUT_USER",

    //------------- user_details --------------

    LOGIN_START: "LOGIN_START",
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    LOGIN_ERROR: "LOGIN_ERROR",

    //--------------- filters_details ---------------

    FILTERS_LOADING: "FILTERS_LOADING",
    FILTERS_RECEIVED: "FILTERS_RECEIVED",
    FILTERS_ERROR: "FILTERS_ERROR",

    //-------------- nlp_details --------------

    INTENTS_LOADING: "INTENTS_LOADING",
    INTENTS_RECEIVED: "INTENTS_RECEIVED",
    INTENTS_ERROR: "INTENTS_ERROR",
    ENTITIES_LOADING: "ENTITIES_LOADING",
    ENTITIES_RECEIVED: "ENTITIES_RECEIVED",
    ENTITIES_ERROR: "ENTITIES_ERROR",
    NLP_SNAPSHOT_UPDATING: "NLP_SNAPSHOT_UPDATING",
    MESSAGE_NLP_SNAPSHOT_UPDATED: "MESSAGE_NLP_SNAPSHOT_UPDATED",
    NLP_SNAPSHOT_UPDATED: "NLP_SNAPSHOT_UPDATED",
    NLP_SNAPSHOT_UPDATION_ERROR: "NLP_SNAPSHOT_UPDATION_ERROR",

    //------------- conversation_details ------------

    HANDLE_CHAT_INTERFACE_VISIBILITY: "HANDLE_CHAT_INTERFACE_VISIBILITY",
    CONVERSATION_PAGE_LOADING: "CONVERSATION_PAGE_LOADING",
    CONVERSATION_SOCKET_CONNECTED: "CONVERSATION_SOCKET_CONNECTED",
    CONVERSATION_SOCKET_CONNECT_ERROR: "CONVERSATION_SOCKET_CONNECT_ERROR",
    CONVERSATION_SOCKET_ERROR: "CONVERSATION_SOCKET_ERROR",
    CONVERSATION_ADDITION: "CONVERSATION_ADDITION",
    CONVERSATION_DELETION: "CONVERSATION_DELETION",
    CONVERSATION_UPDATION: "CONVERSATION_UPDATION",
    CURRENT_CHAT_ITEM: "CURRENT_CHAT_ITEM",
    JOINED_TO_CHATROOM: "JOINED_TO_CHATROOM",
    BOT_MESSAGE_RECEIVED: "BOT_MESSAGE_RECEIVED",
    USER_MESSAGE_RECEIVED: "USER_MESSAGE_RECEIVED",
    CHAT_OVERTAKEN: "CHAT_OVERTAKEN",
    CHAT_RELINQUISH: "CHAT_RELINQUISH",
    UPDATE_CONVERSATION_FILTER: "UPDATE_CONVERSATION_FILTER",
    REMOVE_CONVERSATION_FILTER_ITEM: "REMOVE_CONVERSATION_FILTER_ITEM",
    CLEAR_CONVERSATION_FILTER: "CLEAR_CONVERSATION_FILTER",
    CLEAR_ACTIVE_CHAT_DETAILS: "CLEAR_ACTIVE_CHAT_DETAILS",

    //------------- history_details ------------

    UPDATE_SELECTED_DATE_RANGE: "UPDATE_SELECTED_DATE_RANGE",
    SET_CURRENT_HISTORY_CHAT_ITEM: "SET_CURRENT_HISTORY_CHAT_ITEM",
    HISTORY_LOADING: "HISTORY_LOADING",
    HISTORY_RECEIVED: "HISTORY_RECEIVED",
    HISTORY_ERROR: "HISTORY_ERROR",
    MORE_HISTORY_RECEIVED: "MORE_HISTORY_RECEIVED",
    UPDATE_HISTORY_FILTER: "UPDATE_HISTORY_FILTER",
    REMOVE_HISTORY_FILTER_ITEM: "REMOVE_HISTORY_FILTER_ITEM",
    CLEAR_HISTORY_FILTER: "CLEAR_HISTORY_FILTER",
    GET_CURRENT_HISTORY_RECEIVED: "GET_CURRENT_HISTORY_RECEIVED",
    GET_CURRENT_HISTORY_FAILED: "GET_CURRENT_HISTORY_FAILED",

    //--------------- dashboard_details ---------------

    DASHBOARD_SOCKET_CONNECTED: "DASHBOARD_SOCKET_CONNECTED",
    DASHBOARD_SOCKET_CONNECT_ERROR: "DASHBOARD_SOCKET_CONNECT_ERROR",
    DASHBOARD_SOCKET_ERROR: "DASHBOARD_SOCKET_ERROR",
    LIVE_COUNT_PER_SEC: "LIVE_COUNT_PER_SEC",
    LIVE_COUNT_PER_MIN: "LIVE_COUNT_PER_MIN",
    LAST_N_HOURS_TIME_SERIES: "LAST_N_HOURS_TIME_SERIES",
    UPDATE_SCALE_PER_MIN: "UPDATE_SCALE_PER_MIN",

    //--------------- usage_details ---------------

    UPDATE_CHAT_SESSION_FILTER: "UPDATE_CHAT_SESSION_FILTER",
    CHAT_SESSION_RECEIVED: "CHAT_SESSION_RECEIVED",
    USER_ENGAGEMENT_STATS_LOADING: "USER_ENGAGEMENT_STATS_LOADING",
    USER_ENGAGEMENT_STATS_RECEIVED: "USER_ENGAGEMENT_STATS_RECEIVED",
    USER_ENGAGEMENT_STATS_ERROR: "USER_ENGAGEMENT_STATS_ERROR",
    USER_RETENTION_LOADING: "USER_RETENTION_LOADING",
    USER_RETENTION_RECEIVED: "USER_RETENTION_RECEIVED",
    USER_RETENTION_ERROR: "USER_RETENTION_ERROR",

    //--------------- chatlog_details ---------------

    UPDATE_USER_RETENTION_FILTER: "UPDATE_USER_RETENTION_FILTER",
    UPDATE_MESSAGE_FILTER: "UPDATE_MESSAGE_FILTER",
    MESSAGE_TIME_SERIES_RECEIVED: "MESSAGE_TIME_SERIES_RECEIVED",

    //--------------- session_flow_details ---------------

    UPDATE_SESSION_FLOW_FILTER: "UPDATE_SESSION_FLOW_FILTER",
    SESSION_FLOW_LOADED: "SESSION_FLOW_LOADED",
};

export default actionTypes;