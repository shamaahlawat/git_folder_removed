import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import isEmpty from 'lodash/isEmpty';

import './index.scss';

import * as pageActions from '../../../../data/redux/page_details/actions';
import * as dashboardActions from '../../../../data/redux/dashboard_details/actions';
import { APP_PAGES, SOCKET_EVENTS } from '../../../../data/config/constants';

import PageHeader from '../../../../components/pageheader';
import ChartStatusCard from '../../components/chartstatuscard';
import Graph from '../../components/charts/graph';


function mapStateToProps(state) {
    return {
        page_details: state.page_details,
        dashboard_details: state.dashboard_details
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, pageActions, dashboardActions), dispatch)
    };
}

const scale_per_sec = {
    count: {
        min: 0
    },
    timestamp: {
        type: 'time',
        tickInterval: 15 * 1000,
        mask: 'HH:mm:ss',
        range: [0, 1],
    }
};

class Dashboard extends Component {
    componentWillMount() {
        let { actions } = this.props;
        actions.pageChanged(APP_PAGES.DASHBOARD, APP_PAGES.DASHBOARD);
    }

    componentDidMount() {
        const { dashboard_details, actions } = this.props;
        if (!dashboard_details.socket_details.connectivity.is_socket_connected) {
            actions.registerDashboardSocketListener();
        }
    }

    handlePastHoursLiveTrafficPerMin = (event) => {
        const { actions }=this.props;
        const { socket } = this.props.dashboard_details.socket_details;
        const nHours = event.target.value;
        
        socket.emit(SOCKET_EVENTS.LAST_N_HOURS_TIME_SERIES, { nHours }, (res) => {
            if(res && !res.err) {
                actions.updateScalePerMin(nHours);
            }
        });
    };

    render() {
        const { dashboard_details, page_details } = this.props;

        return (
            <div className="oriDashboardContainer">
                <PageHeader screen_width={page_details.device_data.screen_width} title="live statistics" line_chart title_only />
                <div className="ori-pad-10">
                    {
                        !isEmpty(dashboard_details.live_count) &&
                        <Row gutter={16}>
                            {
                                dashboard_details.live_count.map((item, index) => {
                                    return (
                                        <Col key={index} xs={24} sm={12} md={8} lg={6} className="ori-b-pad-10">
                                            <ChartStatusCard card_data={item} />
                                        </Col>
                                    );
                                })
                            }
                        </Row>
                    }
                    <Row gutter={16}>
                        {
                            !isEmpty(dashboard_details.live_traffic_per_sec) &&
                            <Col md={24} lg={12} className="ori-animated ori-zoom-in ori-b-pad-10">
                                <div className="ori-bg-white ori-lr-pad-15 ori-border-radius-4 ori-box-shadow-light">
                                    <PageHeader screen_width={page_details.device_data.screen_width} title="Live Traffic per Sec" title_only />
                                    <Graph type="line" data={dashboard_details.live_traffic_per_sec} scale={scale_per_sec} x_axis="timestamp" y_axis="count" color_key="userType" padding={[60, 25, 50, 60]} height={350} legend />
                                </div>
                            </Col>
                        }
                        {
                            !isEmpty(dashboard_details.live_traffic_per_min) &&
                            <Col md={24} lg={12} className="ori-animated ori-zoom-in ori-b-pad-10">
                                <div className="ori-bg-white ori-lr-pad-15 ori-border-radius-4 ori-box-shadow-light">
                                    <PageHeader screen_width={page_details.device_data.screen_width} title="Live Traffic per Min" handlePastHours={this.handlePastHoursLiveTrafficPerMin} show_past_hours />
                                    <Graph type="area" data={dashboard_details.live_traffic_per_min} scale={dashboard_details.live_traffic_scale_per_min} x_axis="timestamp" y_axis="count" color_key="userType" padding={[60, 25, 50, 60]} height={350} legend />
                                </div>
                            </Col>
                        }
                    </Row>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    actions: PropTypes.object,
    page_details: PropTypes.object,
    dashboard_details: PropTypes.object,
    history: PropTypes.object,
    match: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(Dashboard);

