import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Avatar, Tooltip } from 'antd';
import isEmpty from 'lodash/isEmpty';
import { TextMessage, TextWithMedia, CarouselWithButtons, Dishtv } from 'chatbot-message-types';

import './index.scss';

import { MESSAGE_SENDER, MESSAGE_TYPES, MESSAGE_SUBTYPES } from '../../../../../../data/config/constants';
import { assets } from '../../../../../../data/assets/assetsurl';

const { Recharge, RechargeDetails, Offers, RechargeHistory } = Dishtv;

export default class ChatBody extends Component {
    componentDidMount() {
        setTimeout(() => { this.props.scrollToBottom(this.props.chatContainer); }, 500);
    }

    componentDidUpdate(prevProps) {
        let { messages } = this.props;
        if (prevProps.messages.length !== messages.length) {
            this.props.scrollToBottom(this.props.chatContainer);
        }
    }

    render() {
        const { messages, admin_details, active_chat_item, editMessageNLPSnapshot, zoom_in, fade_in } = this.props;
        const admin_title = admin_details && admin_details.user_info && admin_details.user_info.firstName ? admin_details.user_info.firstName : "admin";
        const title = active_chat_item && active_chat_item.udf1 && active_chat_item.udf1.trim().length > 0 ? active_chat_item.udf1 : "Unknown";

        return (
            <div className="ori-full-width ori-pad-20 oriChatBodyContainer">
                {
                    messages.map((message, index) => {
                        const first_msg = (index === 0) || (index > 0 && messages[index - 1].sender !== message.sender);
                        const middle_msg = (index > 0 && (index < messages.length - 1) && messages[index + 1].sender === message.sender && messages[index - 1].sender === message.sender);
                        const last_msg = (index > 0 && index === messages.length - 1 && messages[index - 1].sender === message.sender) || (index > 0 && messages[index - 1].sender === message.sender && messages[index + 1].sender !== message.sender);

                        const customer = message.sender === MESSAGE_SENDER.CUSTOMER;
                        const chatbot = message.sender === MESSAGE_SENDER.CHATBOT;
                        const admin = message.sender === MESSAGE_SENDER.ADMIN;

                        const show_prev_intent = message.prevNLPSnapshot && message.prevNLPSnapshot.intentSnapshot && !isEmpty(message.prevNLPSnapshot.intentSnapshot);
                        const show_current_intent = message.NLPSnapshot && message.NLPSnapshot.intentSnapshot && !isEmpty(message.NLPSnapshot.intentSnapshot);

                        const show_textMessage = message.type === MESSAGE_TYPES.TEXT;
                        const show_textWithButtons = message.type === MESSAGE_TYPES.TEXT_WITH_BUTTONS;
                        const show_imageWithButtons = message.type === MESSAGE_TYPES.IMAGE_WITH_BUTTONS;
                        const show_textWithVideo = message.type === MESSAGE_TYPES.VIDEO;

                        const show_textWithMedia = show_textWithButtons || show_imageWithButtons || show_textWithVideo;

                        const show_carousel = message.type === MESSAGE_TYPES.CAROUSEL;

                        const show_recharge = message.type === MESSAGE_TYPES.CUSTOM_MSG && message.payload.subtype === MESSAGE_SUBTYPES.DISH_RECHARGE;
                        const show_rechargeDetails = message.type === MESSAGE_TYPES.CUSTOM_MSG && message.payload.subtype === MESSAGE_SUBTYPES.DISH_RECHARGE_DETAILS;

                        const show_offers = message.type === MESSAGE_TYPES.CUSTOM_MSG && message.payload.subtype === MESSAGE_SUBTYPES.DISH_OFFERS;
                        const show_rechargeHistory = message.type === MESSAGE_TYPES.CUSTOM_MSG && message.payload.subtype === MESSAGE_SUBTYPES.DISH_RECHARGE_HISTORY;

                        let messageBubbleStyle = classNames("ori-animated msgBox ori-lr-pad-10 ori-tb-pad-7",
                            {
                                "ori-bg-default": message.sender === MESSAGE_SENDER.ADMIN,
                                "ori-zoom-in": zoom_in,
                                "ori-fade-in": fade_in,
                                "ori-t-mrgn-10 firstMsg": first_msg,
                                "middleMsg": middle_msg,
                                "lastMsg": last_msg,
                            }
                        );

                        return (
                            <div className={classNames("ori-relative ori-flex msgContainer ", { "receiverMsgContainer": customer, "senderMsgContainer": chatbot || admin })} key={index}>
                                {
                                    first_msg && customer &&
                                    <div className={classNames("ori-absolute ori-animated ori-zoom-in msgAvatar")}>
                                        <Avatar className={classNames("ori-capitalize ori-align-avatar-letter ori-bg-primary")}>{title.charAt(0)}</Avatar>
                                    </div>
                                }
                                {
                                    first_msg && chatbot  &&
                                    <div className={classNames("ori-absolute ori-animated ori-zoom-in msgAvatar")}>
                                        <Avatar src={assets.chatbot} />
                                    </div>
                                }
                                {
                                    first_msg &&  admin &&
                                    <div className={classNames("ori-absolute ori-animated ori-zoom-in msgAvatar")}>
                                        <Avatar className="ori-font-primary ori-capitalize ori-align-avatar-letter ori-bg-white">{admin_title.charAt(0)}</Avatar>
                                    </div>
                                }
                                {
                                    (show_textMessage || show_textWithMedia || show_recharge || show_rechargeDetails || show_offers || show_rechargeHistory || show_carousel) &&
                                    <div className="ori-b-mrgn-4" >
                                        <div className="ori-flex">
                                            <div className={messageBubbleStyle}>
                                                {
                                                    show_textMessage &&
                                                    <TextMessage message={message} editMessageNLPSnapshot={editMessageNLPSnapshot} show_nlp_snapshot />
                                                }
                                                {
                                                    show_textWithMedia &&
                                                    <TextWithMedia message={message} btn_disabled />
                                                }
                                                {
                                                    show_recharge &&
                                                    <Recharge message={message} btn_disabled />
                                                }
                                                {
                                                    show_rechargeDetails &&
                                                    <RechargeDetails message={message} btn_disabled />
                                                }
                                                {
                                                    show_offers &&
                                                    <Offers message={message} disable_offer btn_disabled />
                                                }
                                                {
                                                    show_rechargeHistory &&
                                                    <RechargeHistory message={message} btn_disabled />
                                                }
                                                {
                                                    show_carousel &&
                                                    <CarouselWithButtons message={message} btn_disabled />
                                                }
                                            </div>
                                        </div>
                                        {
                                            message.sender === MESSAGE_SENDER.CUSTOMER &&
                                            <div className="ori-flex-row ori-t-pad-3">
                                                {
                                                    show_prev_intent &&
                                                    <Tooltip overlayClassName="intentTooltip" placement="bottomLeft" title={message.NLPSnapshot.intentSnapshot.score}>
                                                        <div className={classNames("ori-animated ori-zoom-in ori-bg-default ori-lr-pad-6 ori-border-radius-10 ori-font-11 ori-capitalize ori-cursor-ptr ori-line-through")} onClick={() => { editMessageNLPSnapshot(message) }}>{message.NLPSnapshot.intentSnapshot.intent}</div>
                                                    </Tooltip>
                                                }
                                                {
                                                    show_current_intent &&
                                                    <Tooltip overlayClassName="intentTooltip" placement="bottomLeft" title={message.NLPSnapshot.intentSnapshot.score}>
                                                        <div className="ori-animated ori-zoom-in ori-bg-default ori-lr-pad-6 ori-l-mrgn-5 ori-border-radius-10 ori-font-11 ori-capitalize ori-cursor-ptr ori-font-primary" onClick={() => { editMessageNLPSnapshot(message) }}>{message.NLPSnapshot.intentSnapshot.intent}</div>
                                                    </Tooltip>
                                                }
                                            </div>
                                        }
                                    </div>
                                }
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

ChatBody.propTypes = {
    messages: PropTypes.array.isRequired,
    admin_details: PropTypes.object,
    active_chat_item: PropTypes.object,
    editMessageNLPSnapshot: PropTypes.func,
    chatContainer: PropTypes.object,
    scrollToBottom: PropTypes.func,
    fade_in: PropTypes.bool,
    zoom_in: PropTypes.bool
};

ChatBody.defaultProps = {
    fade_in: false,
    zoom_in: false,
};

