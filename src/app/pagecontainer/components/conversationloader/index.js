import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col } from 'antd';
import classNames from 'classnames';

import ConversationListLoader from '../../modules/conversation/components/conversationList/loaders/index';
import ChatInterfaceLoader from '../chatinterface/loaders/index';
import ProfileCardLoader from '../profilecard/loader/index';

export default class ConversationLoader extends Component {
    render() {
        const { page_details } = this.props;
        const is_mobile = page_details.device_data.screen_width < 768;
        const is_tablet = page_details.device_data.screen_width >= 768 && page_details.device_data.screen_width <= 1024;

        return (
            <div className="ori-full-width ori-flex-column oriConversationContainer">
                <div className="ori-full-width ori-full-flex conversationBodyContainer">
                    <Col xs={24} md={is_tablet ? 9 : 6} className="ori-full-parent-height  ori-r-border-light conversationChatListContainer">
                        <ConversationListLoader />
                    </Col>
                    <Col xs={24} md={is_tablet ? 15 : 12} className="conversationChatContainer ori-mobile-hidden">
                        <ChatInterfaceLoader />
                    </Col>
                    <Col xs={24} md={6} className={classNames("ori-l-border-light ori-tb-pad-10 conversationProfileContainer", { 'ori-display-none': is_mobile || is_tablet })}>
                        <ProfileCardLoader />
                    </Col>
                </div>
            </div >
        );
    }
}

ConversationLoader.propTypes = {
    page_details: PropTypes.object,
};

