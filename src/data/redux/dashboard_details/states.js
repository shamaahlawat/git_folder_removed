const states = {
    dashboard_details: {
        socket_details: {
            socket: {},
            connectivity: {
                is_socket_connected: false,
            }
        },
        live_count: [],
        live_traffic_per_sec: [],
        live_traffic_per_min: [],
        live_traffic_scale_per_min: {
            count: {
                min: 0
            },
            timestamp: {
                type: 'time',
                tickInterval: 60 * 15 * 1000,
                mask: 'HH:mm',
                range: [0, 1],
            }
        }
    },
};

export default states;