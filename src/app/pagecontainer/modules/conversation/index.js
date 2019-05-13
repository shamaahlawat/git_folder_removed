import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Col } from 'antd';
import isEmpty from 'lodash/isEmpty';

import './index.scss';

import * as pageActions from '../../../../data/redux/page_details/actions';
import * as filterActions from '../../../../data/redux/filter_details/actions';
import * as nlpActions from '../../../../data/redux/nlp_details/actions';
import * as conversationActions from '../../../../data/redux/conversation_details/actions';
import { APP_PAGES, SOCKET_EVENTS, CHATBOT_CONTROL, PANEL_KEY } from '../../../../data/config/constants';
import { showMessage } from '../../../../data/config/utils';
import { MODULE_CONFIG } from '../../../../data/config/urls';

import ConversationLoader from '../../components/conversationloader';
import ConversationList from './components/conversationList';
import ChatInterface from '../../components/chatinterface';
import ProfileCard from '../../components/profilecard';
import ShowMessage from '../../../../components/showmessage';

function mapStateToProps(state) {
    return {
        page_details: state.page_details,
        admin_details: state.admin_details,
        filter_details: state.filter_details,
        nlp_details: state.nlp_details,
        conversation_details: state.conversation_details,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, pageActions, filterActions, nlpActions, conversationActions), dispatch)
    };
}

class Conversation extends Component {
    constructor() {
        super();
        this.state = {
            activePanelKey: null
        }
    }

    componentWillMount() {
        let { actions } = this.props;
        actions.pageChanged(APP_PAGES.CONVERSATION, APP_PAGES.CONVERSATION);
    }

    componentDidMount() {
        let { conversation_details, filter_details, nlp_details, actions } = this.props;
        if (!conversation_details.socket_details.connectivity.is_socket_connected) {
            actions.registerConservationSocketListener();
        }
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

    handleChatInterface = (bool) => {
        let { actions } = this.props;
        actions.handleChatInterfaceVisibility(bool);
    };

    handleChatInterfaceControl = (control) => {
        const { conversation_details, actions } = this.props;
        const { socket } = this.props.conversation_details.socket_details;
        let data = {
            psid: conversation_details.active_chat_details.active_chat_item.psid
        };

        if (control === CHATBOT_CONTROL.TAKEOVER) {
            socket.emit(SOCKET_EVENTS.TAKEOVER, data, (response) => {
                console.log('takeover response', response);

                if (response.data && response.data.psid) {
                    actions.chatOverTaken(response.data);
                    this.handlePanelCollapse(PANEL_KEY.TAKE_OVER);
                }
                if (response.err) {
                    let message = response.err.message ? response.err.message : 'some error occured. unable to takeover';
                    showMessage('error', message);
                }
            });
        } else if (control === CHATBOT_CONTROL.RELINQUISH) {
            socket.emit(SOCKET_EVENTS.RELINQUISH, data, (response) => {
                console.log('relinquish response', response);

                if (response.data && response.data.psid) {
                    actions.chatRelinquish(response.data);
                    this.handlePanelCollapse(PANEL_KEY.LIVE_CHAT);
                }
                if (response.err) {
                    let message = response.err.message ? response.err.message : 'some error occured. unable to relinquish';
                    showMessage('error', message);
                }
            });
        }
    };

    handleChatInputMsgSend = (text) => {
        const { conversation_details } = this.props;
        const { socket } = this.props.conversation_details.socket_details;
        let data = {
            text,
            psid: conversation_details.active_chat_details.active_chat_item.psid
        };
        console.log('admin msg send ', data);
        socket.emit(SOCKET_EVENTS.ADMIN_TO_USER_MSG, data);
    };

    handlePanelCollapse = (key) => {
        this.setState({ activePanelKey: key });
    };

    render() {
        const { page_details, filter_details, nlp_details, conversation_details, admin_details, actions } = this.props;
        const screen_height = page_details.device_data.screen_height;
        const screen_width = page_details.device_data.screen_width;
        const is_mobile = screen_width < 768;
        const is_tablet = screen_width >= 768 && screen_width <= 1024;

        if (filter_details.loaders.filters_loading || nlp_details.loaders.intents_loading) {
            return (
                <ConversationLoader page_details={page_details} />
            );
        } else if (!nlp_details.loaders.intents_loading && !filter_details.loaders.filters_loading && conversation_details && isEmpty(conversation_details.live_chat_details) && isEmpty(conversation_details.overtaken_chat_details)) {
            return (
                <div className="ori-full-width" style={{ height: (screen_height - 60) }}>
                    <ShowMessage message="Sorry... no chat is going on" sad fade_item />
                </div>
            );
        } else if (filter_details.loaders.filters_loaded && nlp_details.loaders.intents_loaded) {
            return (
                <div className="ori-animated ori-fade-in ori-full-width ori-flex-column oriConversationContainer">
                    <div className="ori-full-width ori-full-flex conversationBodyContainer">
                        <Col xs={24} md={is_tablet ? 9 : 6} className="ori-full-parent-height  ori-r-border-light conversationChatListContainer">
                            <ConversationList screen_height={screen_height} admin_id={admin_details.admin_id} live_chat_details={conversation_details.live_chat_details} overtaken_chat_details={conversation_details.overtaken_chat_details} filters={filter_details.filters} selected_filters={conversation_details.selected_filters} active_chat_item={conversation_details.active_chat_details.active_chat_item} is_chatinterface_visible={conversation_details.is_chatinterface_visible} actions={actions} socket={conversation_details.socket_details.socket} handleChatInterface={this.handleChatInterface} handlePanelCollapse={this.handlePanelCollapse} activePanelKey={this.state.activePanelKey} />
                        </Col>
                        {
                            conversation_details.is_chatinterface_visible &&
                            <Col xs={24} md={is_tablet ? 15 : 12} className="conversationChatContainer" style={{ height: is_mobile ? screen_height : "" }}>
                                <ChatInterface admin_details={admin_details} messages={conversation_details.active_chat_details.messages} nlp_details={nlp_details} actions={actions} hide_admin_control={MODULE_CONFIG.CONVERSATION.HIDE_ADMIN_CONTROL} active_chat_item={conversation_details.active_chat_details.active_chat_item} handleChatInputMsgSend={this.handleChatInputMsgSend} handleChatInterface={this.handleChatInterface} handleChatInterfaceControl={this.handleChatInterfaceControl} fade_in />
                            </Col>
                        }
                        {
                            !conversation_details.is_chatinterface_visible && conversation_details.active_chat_details.messages.length === 0 &&
                            <Col xs={24} md={is_tablet ? 15 : 12} className={classNames("ori-full-parent-height", { "ori-bg-default": is_mobile })}>
                                <ShowMessage message="Pick a conversation to start messaging" height={100} width={120} chatting />
                            </Col>
                        }
                        <Col xs={24} md={6} className={classNames("ori-l-border-light ori-tb-pad-10 conversationProfileContainer", { 'ori-display-none': is_mobile || is_tablet })}>
                            {
                                !isEmpty(conversation_details.active_chat_details.user_profile_details) && <ProfileCard profile_details={conversation_details.active_chat_details.user_profile_details} />
                            }
                            {
                                isEmpty(conversation_details.active_chat_details.user_profile_details) && <ShowMessage message="Profile details are not avaliable" height={100} width={50} color='primary' person />
                            }
                        </Col>
                    </div>
                </div >
            );
        } else {
            return null;
        }
    }
}

Conversation.propTypes = {
    actions: PropTypes.object,
    page_details: PropTypes.object,
    admin_details: PropTypes.object,
    filter_details: PropTypes.object,
    nlp_details: PropTypes.object,
    conversation_details: PropTypes.object,
    history: PropTypes.object,
    match: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(Conversation);
