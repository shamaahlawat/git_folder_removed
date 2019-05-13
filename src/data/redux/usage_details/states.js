import moment from 'moment';

const states = {
    usage_details: {
        user_engagement_stats: [],
        chat_session_time_series: [],
        chat_session_filters: {
            date_range: [moment(new Date(), "DD-MM-YYYY").subtract(1, 'days'), moment(new Date(), "DD-MM-YYYY")],
            platform: "all",
            granularity: "hour"
        },
        chat_session_scale: {
            count: {
                min: 0
            },
            timestamp: {
                type: 'time',
                tickInterval: 60 * 60 * 1000 * 6, // 6 hours
                mask: 'HH:mm',
                range: [0, 1],
            }
        },
        user_retention: {
            cohorts_columns:[],
            cohorts_data:[],
            retention_filters: {
                date_range: [moment(new Date(), "DD-MM-YYYY").subtract(6, 'days'), moment(new Date(), "DD-MM-YYYY")],
                granularity: "day"
            }
        },
        loaders: {
            user_stats_loading: false,
            user_stats_loaded: false,
            user_retention_loading: false,
            user_retention_loaded: false
        }
    }
};

export default states;