import moment from 'moment';

const states = {
    chatlog_details: {
        message_time_series: [],
        message_filters: {
            date_range: [moment(new Date(), "DD-MM-YYYY").subtract(1, 'days'), moment(new Date(), "DD-MM-YYYY")],
            platform: "all",
            granularity: "hour"
        },
        message_scale: {
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
    }
};

export default states;