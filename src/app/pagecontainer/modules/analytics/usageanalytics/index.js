import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Table } from 'antd';
import isEmpty from 'lodash/isEmpty';
import moment from 'moment'

import './index.scss';

import * as pageActions from '../../../../../data/redux/page_details/actions';
import * as usageActions from '../../../../../data/redux/usage_details/actions';
import { APP_PAGES } from '../../../../../data/config/constants';
import PageHeader from '../../../../../components/pageheader';
import ChartStatusCard from '../../../components/chartstatuscard';
import Graph from '../../../components/charts/graph';

function mapStateToProps(state) {
    return {
        page_details: state.page_details,
        usage_details: state.usage_details
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, pageActions, usageActions), dispatch)
    };
}

class UsageAnalytics extends Component {
    componentWillMount() {
        const { actions } = this.props;
        actions.pageChanged(APP_PAGES.USAGE_ANALYTICS, APP_PAGES.ANALYTICS);
    }

    componentDidMount() {
        const { actions, usage_details } = this.props;
        if (isEmpty(usage_details.chat_session_time_series)) {
            const payload = {
                startDate: usage_details.chat_session_filters.date_range[0],
                endDate: usage_details.chat_session_filters.date_range[1],
                platform: usage_details.chat_session_filters.platform,
                granularity: usage_details.chat_session_filters.granularity
            };
            actions.getChatSessionTimeSeries(payload);
            actions.getUserEngagementStats(payload);
            
        }
        if(isEmpty(usage_details.user_retention.cohorts_data)|| isEmpty(usage_details.user_retention.cohorts_columns)){
            const payload = {
                startDate: usage_details.user_retention.retention_filters.date_range[0],
                endDate: usage_details.user_retention.retention_filters.date_range[1],
                granularity: usage_details.user_retention.retention_filters.granularity
            };
            actions.getUserRetention(payload);
        }
    }

    handleChatSessionDateRangeChange = (date_range) => {
        const { actions, usage_details } = this.props;
        const payload = {
            startDate: date_range[0],
            endDate: date_range[1],
            platform: usage_details.chat_session_filters.platform,
            granularity: usage_details.chat_session_filters.granularity
        };
        actions.getChatSessionTimeSeries(payload);
        actions.getUserEngagementStats(payload);
        actions.updateChatSessionFilter(date_range, "chat_session_filters.date_range");
    };

    handleChatSessionPlatformChange = (platform) => {
        const { actions, usage_details } = this.props;
        const payload = {
            startDate: usage_details.chat_session_filters.date_range[0],
            endDate: usage_details.chat_session_filters.date_range[1],
            granularity: usage_details.chat_session_filters.granularity,
            platform
        };
        actions.getChatSessionTimeSeries(payload);
        actions.updateChatSessionFilter(platform, "chat_session_filters.platform");
    };

    handleChatSessionGranularityChange = (event) => {
        const granularity = event.target.value;
        const { actions, usage_details } = this.props;
        const payload = {
            startDate: usage_details.chat_session_filters.date_range[0],
            endDate: usage_details.chat_session_filters.date_range[1],
            platform: usage_details.chat_session_filters.platform,
            granularity
        };
        actions.getChatSessionTimeSeries(payload);
        actions.updateChatSessionFilter(granularity, "chat_session_filters.granularity");
    };

    handleUserRetentionDateRangeChange = (date_range) => {
        const { actions, usage_details } = this.props;
        const payload = {
            startDate: date_range[0],
            endDate: date_range[1],
            granularity: usage_details.user_retention.retention_filters.granularity
        };
        actions.getUserRetention(payload, actions.updateUserRetentionFilter(date_range, "user_retention.retention_filters.date_range"));
        
    };

    handleUserRetentionGranularityChange = (event) => {
        const granularity = event.target.value;
        const { actions, usage_details } = this.props;
        const payload = {
            startDate: usage_details.user_retention.retention_filters.date_range[0],
            endDate: usage_details.user_retention.retention_filters.date_range[1],
            granularity,
        };
        actions.getUserRetention(payload, actions.updateUserRetentionFilter(granularity, "user_retention.retention_filters.granularity"));
    };

    render() {
        const { page_details, usage_details } = this.props;
        const mobile = page_details.device_data.screen_width <= 480;

        return (
            <div className="oriUsageAnalyticsContainer">
                <PageHeader screen_width={page_details.device_data.screen_width} title="Usages Analytics" pie_chart title_only />
                <Row className="ori-pad-10">
                    <Col xs={24} className="ori-animated ori-zoom-in">
                        <div className="ori-bg-white ori-lr-pad-15 ori-border-radius-4 ori-box-shadow-light">
                            <PageHeader screen_width={page_details.device_data.screen_width} title="Chat Sessions" date_range={usage_details.chat_session_filters.date_range} handleDateRangeChange={this.handleChatSessionDateRangeChange} platform={usage_details.chat_session_filters.platform} handlePlatformChange={this.handleChatSessionPlatformChange} granularity={usage_details.chat_session_filters.granularity} handleGranularityChange={this.handleChatSessionGranularityChange} show_date_range show_granularity show_platform />
                            {
                                !isEmpty(usage_details.chat_session_time_series) &&
                                <Graph type="area" data={usage_details.chat_session_time_series} x_axis="timestamp" y_axis="count" color_key="platformType" scale={usage_details.chat_session_scale} shape="smooth" height={350} padding={[60, 25, 50, 60]} legend />
                            }
                        </div>
                    </Col>
                </Row>
                {
                    !isEmpty(usage_details.user_engagement_stats) &&
                    <PageHeader screen_width={page_details.device_data.screen_width} title="User Engagement  Statistics" group title_only />
                }
                {
                    !isEmpty(usage_details.user_engagement_stats) &&
                    <Row className="ori-pad-5">
                        {
                            usage_details.user_engagement_stats.map((item, index) => {
                                return (
                                    <Col key={index} xs={24} sm={12} md={8} lg={6} className="ori-animated ori-zoom-in ori-pad-5">
                                        <ChartStatusCard card_data={item} loading={usage_details.loaders.user_stats_loading} />
                                    </Col>
                                );
                            })
                        }
                    </Row>
                }
                <Row className="ori-pad-10">
                    <Col xs={24} className="ori-animated ori-zoom-in ori-bg-white ori-lr-pad-15 ori-border-radius-4 ori-box-shadow-light ori-b-pad-10">
                        <PageHeader screen_width={page_details.device_data.screen_width} title="User Retention" show_date_range date_range={usage_details.user_retention.retention_filters.date_range} handleDateRangeChange={this.handleUserRetentionDateRangeChange} show_granularity granularity_hour_hidden granularity={usage_details.user_retention.retention_filters.granularity} handleGranularityChange={this.handleUserRetentionGranularityChange}  />
                        <Table className="oriRetensionTable" rowClassName="tablerowsClass" loading={usage_details.loaders.user_retention_loading} size={mobile ? "small" : "middle"} scroll={{ x: 600 }} columns={usage_details.user_retention.cohorts_columns} dataSource={usage_details.user_retention.cohorts_data} />
                    </Col>
                </Row>
            </div>
        );
    }
}

UsageAnalytics.propTypes = {
    actions: PropTypes.object,
    page_details: PropTypes.object,
    usage_details: PropTypes.object,
    history: PropTypes.object,
    match: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(UsageAnalytics);
