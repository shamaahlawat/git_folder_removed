import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Badge, Tooltip } from 'antd';
import classNames from 'classnames';
import Moment from 'react-moment';

import './index.scss';

import { PLATFORM } from '../../../../data/config/constants';
import { getAvatarBgClass } from '../../../../data/config/utils';
import { icons, assets } from '../../../../data/assets/assetsurl';

const { Desktop, Android, Apple } = icons;

export default class ConversationItem extends Component {
    render() {
        const { chat_item, active, fade_in, fade_in_left, handleChatItemClicked } = this.props;
        const title = chat_item && chat_item.udf1 ? chat_item.udf1 : "unknown";
        const avatarBgClass = getAvatarBgClass(title);

        return (
            <div className={classNames("ori-animated ori-full-width ori-pad-15 ori-cursor-ptr ori-flex-row ori-t-border-light oriConversationItemContainer", { "ori-bg-default": active, "ori-fade-in-left": fade_in_left, "ori-fade-in": fade_in })} onClick={() => handleChatItemClicked(chat_item)}>
                <div className="ori-animated ori-zoom-in ori-r-pad-10">
                    <Badge className="avatarBadge" dot count={chat_item.online ? 1 : 0}>
                        <Avatar className={classNames("ori-uppercase ori-align-avatar-letter", { ...avatarBgClass })}>{title.charAt(0)}</Avatar>
                    </Badge>
                </div>
                <div className="ori-full-flex ori-overflow-hidden">
                    <p className="ori-font-bold ">
                        <span className="ori-capitalize">{title}</span>
                        {
                            chat_item.udf2 && <span>/{chat_item.udf2}</span>
                        }
                    </p>
                    <div className="ori-full-width ori-font-xs ori-font-light lastMessage">
                        <span>{chat_item.lastMessage}</span>
                    </div>
                    <div className="ori-flex-row">
                        {
                            chat_item.platform &&
                            <div className="ori-r-mrgn-5 ori-flex iconContainer">
                                {
                                    chat_item.platform === PLATFORM.WEBSITE &&
                                    <Tooltip placement="bottomLeft" title={<span className="ori-font-xs">{chat_item.platform}</span>}>
                                        <Desktop size={14} className="ori-font-light" />
                                    </Tooltip>
                                }
                                {
                                    chat_item.platform === PLATFORM.ANDROID &&
                                    <Android size={14} className="ori-font-light" />
                                }
                                {
                                    chat_item.platform === PLATFORM.IOS &&
                                    <Apple size={14} className="ori-font-light" />
                                }
                                {
                                    chat_item.platform === PLATFORM.FACEBOOK &&
                                    <img src={assets.messenger} alt="" className="messengerIcon" />
                                }
                            </div>
                        }
                        {
                            chat_item.lastMessageTimeStamp &&
                            <p className="ori-font-xs ori-font-light ori-full-flex">
                                <Moment fromNow >{chat_item.lastMessageTimeStamp}</Moment>
                            </p>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

ConversationItem.propTypes = {
    chat_item: PropTypes.object.isRequired,
    active: PropTypes.bool,
    handleChatItemClicked: PropTypes.func,
    fade_in: PropTypes.bool,
    fade_in_left: PropTypes.bool,
};

ConversationItem.defaultProps = {
    active: false,
    fade_in: false,
    fade_in_left: false
}

