import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import isEmpty from 'lodash/isEmpty';

import './index.scss';

import * as pageActions from '../../../../data/redux/page_details/actions';
import * as historyActions from '../../../../data/redux/history_details/actions';
import * as filterActions from '../../../../data/redux/filter_details/actions';
import * as nlpActions from '../../../../data/redux/nlp_details/actions';
import { APP_PAGES, MODULE_DATA } from '../../../../data/config/constants';

import ConversationLoader from '../../components/conversationloader';
import HistoryList from './historylist';
import ChatInterface from '../../components/chatinterface';
import ProfileCard from '../../components/profilecard';
import ShowMessage from '../../../../components/showmessage';
import SpinnerLoader from '../../../../components/spinnerloader';

function mapStateToProps(state) {
    return {
        page_details: state.page_details,
        admin_details: state.admin_details,
        filter_details: state.filter_details,
        nlp_details: state.nlp_details,
        history_details: state.history_details
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, pageActions, historyActions, filterActions, nlpActions), dispatch)
    };
}

class ChatHistory extends Component {
    componentWillMount() {
        let { actions } = this.props;
        actions.pageChanged(APP_PAGES.CHAT_HISTORY, APP_PAGES.CHAT_HISTORY);
    }

    componentDidMount() {
        let { actions, history_details, filter_details, nlp_details } = this.props;
        let payload = {
            skip: 0,
            required: MODULE_DATA.HISTORY.LOAD_MORE_HISTORY_COUNT,
            filters: {
                startDate: history_details.selected_date_range && history_details.selected_date_range.length > 0 ? history_details.selected_date_range[0] : "",
                endDate: history_details.selected_date_range && history_details.selected_date_range.length > 0 ? history_details.selected_date_range[1] : "",
            },
        };
        actions.getChatHistory(payload);
        if (filter_details.filters.length === 0) {
            actions.getFiltersData();
        }
        if (nlp_details.intents.length === 0) {
            actions.getAllIntents();
        }
        if (nlp_details.entities.length === 0) {
            actions.getAllEntities();
        }
    }

    render() {
        const { page_details, admin_details, history_details, filter_details, nlp_details, actions } = this.props;
        const screen_height = page_details.device_data.screen_height;
        const screen_width = page_details.device_data.screen_width;
        const is_mobile = screen_width < 768;
        const is_tablet = screen_width >= 768 && screen_width <= 1024;
        const current_session_id = history_details.current_chat_history_details.active_chat_item && history_details.current_chat_history_details.active_chat_item.sessionId ? history_details.current_chat_history_details.active_chat_item.sessionId : null;

        if (filter_details.loaders.filters_loading || nlp_details.loaders.intents_loading) {
            return (
                <ConversationLoader page_details={page_details} />
            );
        } else if (!filter_details.loaders.filters_loading && !nlp_details.loaders.intents_loading && !filter_details.loaders.filters_loaded) {
            return (
                <div className="oriChatHistoryContainer">
                    <ShowMessage message="Something went wrong please check internet connection and refresh the page" sad fade_item />
                </div>
            );
        } else if (filter_details.loaders.filters_loaded && nlp_details.loaders.intents_loaded) {
            return (
                <Row className="ori-bg-white oriChatHistoryContainer">
                    <Col xs={24} md={is_tablet ? 9 : 6} className="ori-relative ori-full-parent-height ori-r-border-light">
                        {
                            history_details.loaders.history_loading &&
                            <div className="ori-absolute ori-align-full ori-zindex-1">
                                <SpinnerLoader bg_white />
                            </div>
                        }
                        <HistoryList selected_date_range={history_details.selected_date_range} filters={filter_details.filters} selected_filters={history_details.selected_filters} chat_history_list={history_details.chat_history_list} load_more_history={history_details.load_more_history} total_history_count={history_details.total_history_count} actions={actions} screen_height={screen_height} current_session_id={current_session_id} />
                    </Col>
                    <Col xs={24} md={is_tablet ? 15 : 12} className="chatInterfaceContainer" style={{ height: is_mobile ? screen_height : "" }}>
                        <ChatInterface messages={history_details.current_chat_history_details.messages} admin_details={admin_details} nlp_details={nlp_details} actions={actions} active_chat_item={history_details.current_chat_history_details.active_chat_item} />
                    </Col>
                    <Col xs={24} md={6} className={classNames("ori-full-parent-height ori-l-border-light ori-overflow-auto", { "ori-display-none": is_mobile || is_tablet })} style={{ height: screen_height - 60 }}>
                        {
                            !isEmpty(history_details.current_chat_history_details.user_profile_details) && <ProfileCard profile_details={history_details.current_chat_history_details.user_profile_details} />
                        }
                        {
                            isEmpty(history_details.current_chat_history_details.user_profile_details) && <ShowMessage message="Profile details are not avaliable" height={100} width={50} color='primary' person />
                        }
                    </Col>
                </Row >
            );
        } else {
            return null;
        }
    }
}

ChatHistory.propTypes = {
    actions: PropTypes.object,
    page_details: PropTypes.object,
    admin_details: PropTypes.object,
    filter_details: PropTypes.object,
    nlp_details: PropTypes.object,
    history_details: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(ChatHistory);
