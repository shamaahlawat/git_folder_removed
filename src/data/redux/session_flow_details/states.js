import moment from 'moment';

const states = {
    session_flow_details: {
        session_flow: [],
        session_flow_filters: {
            date_range: [moment(new Date(), "DD-MM-YYYY").subtract(1, 'days'), moment(new Date(), "DD-MM-YYYY")],
        },
    }
};

export default states;