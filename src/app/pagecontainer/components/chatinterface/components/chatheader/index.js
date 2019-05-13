import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import classNames from 'classnames';
import { Button, Avatar } from 'antd';
import Back from 'react-icons/lib/io/android-arrow-back';

import { CHATBOT_CONTROL } from '../../../../../../data/config/constants';
import { getAvatarBgClass } from '../../../../../../data/config/utils';
import { assets } from '../../../../../../data/assets/assetsurl';


export default class ChatHeader extends Component {
    render() {
        const { active_chat_item, admin_id, handleChatInterface, hide_admin_control, handleChatInterfaceControl } = this.props;
        const title = active_chat_item && active_chat_item.udf1 && active_chat_item.udf1.trim().length > 0 ? active_chat_item.udf1 : "Unknown";
        const avatarBgClass = getAvatarBgClass(title);
        
        return (
            <div className="ori-lr-pad-15 ori-full-width ori-full-parent-height ori-flex-row ori-flex-jsb oriChatHeaderContainer">
                <div className="ori-flex-row">
                    <div className="ori-r-mrgn-10 ori-flex-column ori-flex-jc ori-cursor-ptr ori-desktop-hidden" onClick={() => handleChatInterface(false)}>
                        <Back size={20} className="ori-font-bold" />
                    </div>
                    {
                        active_chat_item && 
                        <div className="ori-flex-row profileAvatarContainer">
                            <div className="ori-r-mrgn-10 ori-animated ori-zoom-in">
                                <Avatar className={classNames("ori-uppercase ori-align-avatar-letter", { ...avatarBgClass })}>{title.charAt(0)}</Avatar>
                            </div>
                            <div>
                                <p className="ori-capitalize title">{title}</p>
                                {
                                    active_chat_item.lastMessageTimeStamp &&
                                    <p className="ori-font-light description">Last activity <Moment fromNow >{active_chat_item.lastMessageTimeStamp}</Moment></p>
                                }
                            </div>
                        </div>
                    }
                </div>
                {
                    active_chat_item &&
                    <div className="ori-flex-row ori-flex-ac">
                        {
                            active_chat_item.overtakenAdminId === null && !hide_admin_control &&
                            <Button className="ori-animated ori-fade-in ori-font-xs ori-l-mrgn-5 ori-border-radius-20 ori-btn-ghost-primary" onClick={() => handleChatInterfaceControl(CHATBOT_CONTROL.TAKEOVER)}>Takeover</Button>
                        }
                        {
                            active_chat_item.overtakenAdminId && !hide_admin_control &&(active_chat_item.overtakenAdminId === admin_id) &&
                            <Button className="ori-animated ori-fade-in ori-font-xs ori-l-mrgn-5 ori-border-radius-20 ori-btn-ghost-primary" onClick={() => handleChatInterfaceControl(CHATBOT_CONTROL.RELINQUISH)}>Relinquish</Button>
                        }
                        {
                            active_chat_item.overtakenAdminId && !hide_admin_control &&(active_chat_item.overtakenAdminId !== admin_id) &&
                            <div className="ori-l-mrgn-5 ">
                                <img className="ori-height-xxl" src={assets.userTyping} alt="" />
                                <span className="ori-l-mrgn-5 ori-font-xs ori-font-warning"> Overtaken by other</span>
                            </div>
                        }
                    </div>
                }
            </div>
        );
    }
}

ChatHeader.propTypes = {
    active_chat_item: PropTypes.object,
    hide_admin_control: PropTypes.bool,
    admin_id: PropTypes.string,
    handleChatInterface: PropTypes.func,
    handleTakeover: PropTypes.func,
    handleRelinquish: PropTypes.func,
    handleChatInterfaceControl: PropTypes.func,
};

