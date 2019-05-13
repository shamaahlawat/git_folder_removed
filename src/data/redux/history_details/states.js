import moment from 'moment';

const states = {
    history_details: {
        chat_history_list: [],
        total_history_count: 0,
        load_more_history: false,
        current_chat_history_details:{
            active_chat_item: null,
            messages:[],
            user_profile_details:{}
        },
        selected_date_range: [moment(new Date(),"DD-MM-YYYY").subtract(1, 'days'), moment(new Date(),"DD-MM-YYYY")],
        selected_filters: {}, //do not define any initial state inside selected_filters**
        loaders: {
            history_loading: false,
            history_loaded: false,
        }
    },
};

export default states;