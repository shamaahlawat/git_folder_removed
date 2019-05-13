import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import isEmpty from 'lodash/isEmpty';

import './index.scss';

import * as pageActions from '../../../../../data/redux/page_details/actions';
import * as chatlogActions from '../../../../../data/redux/chatlog_details/actions';

import { APP_PAGES } from '../../../../../data/config/constants';

import PageHeader from '../../../../../components/pageheader';
import Graph from '../../../components/charts/graph';

function mapStateToProps(state) {
    return {
        page_details: state.page_details,
        chatlog_details: state.chatlog_details
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, pageActions, chatlogActions), dispatch)
    };
}

class ChatlogAnalytics extends Component {
    componentWillMount() {
        const { actions } = this.props;
        actions.pageChanged(APP_PAGES.CHATLOG_ANALYTICS, APP_PAGES.ANALYTICS);
    }

    componentDidMount() {
        const { actions, chatlog_details } = this.props;
        if (isEmpty(chatlog_details.message_time_series)) {
            const payload = {
                startDate: chatlog_details.message_filters.date_range[0],
                endDate: chatlog_details.message_filters.date_range[1],
                platform: chatlog_details.message_filters.platform,
                granularity: chatlog_details.message_filters.granularity
            };
            actions.getMessageTimeSeries(payload);
        }
    }

    handleMessageDateRangeChange = (date_range) => {
        const { actions, chatlog_details } = this.props;
        const payload = {
            startDate: date_range[0],
            endDate: date_range[1],
            platform: chatlog_details.message_filters.platform,
            granularity: chatlog_details.message_filters.granularity
        };
        actions.getMessageTimeSeries(payload);
        actions.updateMessageFilter(date_range, "message_filters.date_range");
    };

    handleMessagePlatformChange = (platform) => {
        const { actions, chatlog_details } = this.props;
        const payload = {
            startDate: chatlog_details.message_filters.date_range[0],
            endDate: chatlog_details.message_filters.date_range[1],
            granularity: chatlog_details.message_filters.granularity,
            platform
        };
        actions.getMessageTimeSeries(payload);
        actions.updateMessageFilter(platform, "message_filters.platform");
    };

    handleMessageGranularityChange = (event) => {
        const granularity = event.target.value;
        const { actions, chatlog_details } = this.props;
        const payload = {
            startDate: chatlog_details.message_filters.date_range[0],
            endDate: chatlog_details.message_filters.date_range[1],
            platform: chatlog_details.message_filters.platform,
            granularity
        };
        actions.getMessageTimeSeries(payload);
        actions.updateMessageFilter(granularity, "message_filters.granularity");
    };


    render() {
        const { page_details, chatlog_details } = this.props;

        return (
            <div className="oriChatlogAnalyticsAnalyticsContainer">
                <PageHeader screen_width={page_details.device_data.screen_width} title="Chatlog Analytics" paper_plane title_only />
                <Row className="ori-pad-10">
                    <Col xs={24} className="ori-animated ori-zoom-in">
                        <div className="ori-bg-white ori-lr-pad-15 ori-border-radius-4 ori-box-shadow-light">
                            <PageHeader screen_width={page_details.device_data.screen_width} title="Message Statistics" show_date_range date_range={chatlog_details.message_filters.date_range} handleDateRangeChange={this.handleMessageDateRangeChange} show_platform platform={chatlog_details.message_filters.platform} handlePlatformChange={this.handleMessagePlatformChange} show_granularity granularity={chatlog_details.message_filters.granularity} handleGranularityChange={this.handleMessageGranularityChange} />
                            {
                                !isEmpty(chatlog_details.message_time_series) &&
                                <Graph type="line" data={chatlog_details.message_time_series} x_axis="timestamp" y_axis="count" color_key="type" scale={chatlog_details.message_scale} height={350} padding={[60, 25, 50, 60]} legend />
                            }
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

ChatlogAnalytics.propTypes = {
    actions: PropTypes.object,
    page_details: PropTypes.object,
    chatlog_details: PropTypes.object,
    history: PropTypes.object,
    match: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(ChatlogAnalytics);

