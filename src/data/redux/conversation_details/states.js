const states = {
    conversation_details: {
        is_chatinterface_visible: false,
        socket_details: {
            socket: {},
            connectivity: {
                is_socket_connected: false,
            }
        },
        live_chat_details: {},
        overtaken_chat_details: {},
        active_chat_details: {
            active_chat_item: null,
            messages: [],
            user_profile_details: {}
        },
        selected_filters:{}, //do not define any initial state inside selected_filters**
        loaders: {
            page_loading: false,
            page_loaded: false,
        }
    }
};

export default states;
