import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Icon, Form, Input, Button, Modal } from 'antd';
import ReactDOM from "react-dom";
import PaperPlane from 'react-icons/lib/io/ios-paperplane';
import Smiley from 'react-icons/lib/md/sentiment-satisfied';

import './index.scss';

import { assets } from '../../../../data/assets/assetsurl';

import ChatHeader from './components/chatheader';
import ChatBody from './components/chatbody';
import Insight from './components/insight';

const { TextArea } = Input;

export default class ChatInterface extends Component {
    constructor() {
        super();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleMessageSend = this.handleMessageSend.bind(this);

        this.state = {
            input_message: "",
            show_insight: false,
            modal_title: null,
            active_popup_message: null
        };
    }

    handleInputChange = (event) => {
        let input_message = event.target.value;
        this.setState({ input_message });
    };

    handleMessageSend = (e) => {
        e.preventDefault();
        let { handleChatInputMsgSend } = this.props;
        let text = this.state.input_message.trim();
        handleChatInputMsgSend(text);
        this.setState({ input_message: "" });
    };

    inputKeyDown = (e) => {
        let { input_message } = this.state;
        if (e.keyCode === 13 && !e.shiftKey && input_message.trim().length > 0) {
            this.handleMessageSend(e);
        }
    };

    scrollToBottom = (chatContainer) => {
        const node = ReactDOM.findDOMNode(chatContainer);
        if (node) {
            node.scrollTop = node.scrollHeight;
        }
    };

    editMessageNLPSnapshot = (message) => {
        this.setState({
            show_insight: true,
            modal_title: "INSIGHTS",
            active_popup_message: message
        });
    };

    updateMessageIntent = (data) => {
        const { active_popup_message } = this.state;
        this.setState({
            active_popup_message: {
                ...active_popup_message,
                NLPSnapshot: {
                    ...active_popup_message.NLPSnapshot,
                    intentSnapshot: {
                        ...active_popup_message.NLPSnapshot.intentSnapshot,
                        intent: data
                    }
                }
            }
        });
    };

    addEntity = (entity) => {
        const { active_popup_message } = this.state;
        this.setState({
            active_popup_message: {
                ...active_popup_message,
                NLPSnapshot: {
                    ...active_popup_message.NLPSnapshot,
                    entitySnapshot: [...active_popup_message.NLPSnapshot.entitySnapshot, entity]
                }
            }
        });
    };

    updateEntityType = (type, index) => {
        const { active_popup_message } = this.state;
        let updated_entity = {
            ...active_popup_message.NLPSnapshot.entitySnapshot[index],
            type,
        };

        this.setState({
            active_popup_message: {
                ...active_popup_message,
                NLPSnapshot: {
                    ...active_popup_message.NLPSnapshot,
                    entitySnapshot: [...active_popup_message.NLPSnapshot.entitySnapshot.slice(0, index), updated_entity, ...active_popup_message.NLPSnapshot.entitySnapshot.slice(index + 1)]
                }
            }
        });
    };

    deleteEntity = (index) => {
        const { active_popup_message } = this.state;
        this.setState({
            active_popup_message: {
                ...active_popup_message,
                NLPSnapshot: {
                    ...active_popup_message.NLPSnapshot,
                    entitySnapshot: [...active_popup_message.NLPSnapshot.entitySnapshot.slice(0, index), ...active_popup_message.NLPSnapshot.entitySnapshot.slice(index + 1)]
                }
            }
        });
    };

    closeModal = () => {
        this.setState({
            show_insight: false,
            active_popup_message: null
        });
    };

    render() {
        let { input_message, show_insight, modal_title, active_popup_message } = this.state;
        const { messages, nlp_details, hide_admin_control, actions, active_chat_item, admin_details, handleChatInterface, handleChatInterfaceControl, fade_in, zoom_in } = this.props;
        const visible = show_insight;

        return (
            <div className="ori-bg-default ori-full-width ori-full-parent-height ori-flex-column oriChatInterfaceContainer" style={{ backgroundImage: `url(${assets.chatInterface})` }}>
                <div className="ori-box-shadow chatHeaderContainer">
                    <ChatHeader active_chat_item={active_chat_item} hide_admin_control={hide_admin_control} admin_id={admin_details.admin_id} handleChatInterface={handleChatInterface} handleChatInterfaceControl={handleChatInterfaceControl} />
                </div>
                <div className="ori-full-flex ori-b-pad-40 chatBodyContainer" ref={el => { this.chatContainer = el; }}>
                    <ChatBody active_chat_item={active_chat_item} admin_details={admin_details} chatContainer={this.chatContainer} scrollToBottom={this.scrollToBottom} messages={messages} fade_in={fade_in} zoom_in={zoom_in} editMessageNLPSnapshot={this.editMessageNLPSnapshot} />
                </div>
                <div className="chatFooterContainer">
                    {
                        active_chat_item && active_chat_item.overtakenAdminId && (active_chat_item.overtakenAdminId === admin_details.admin_id) &&
                        <div className="ori-relative ori-animated ori-zoom-in ori-box-shadow ori-flex-column ori-flex-jc inputContainer">
                            <div className="ori-absolute ori-border-radius-4 ori-flex-row ori-flex-center ori-cursor-ptr alignAddIcon chatIconContainer">
                                <Icon type="plus" className="ori-font-lg ori-font-light" />
                            </div>
                            <div className="ori-absolute ori-border-radius-4 ori-flex-row ori-flex-center ori-cursor-ptr alignSmileIcon chatIconContainer">
                                <Smiley size={24} className="ori-font-light" />
                            </div>
                            <Form onSubmit={this.handleMessageSend}>
                                <TextArea placeholder="Type your Message.." className="ori-lr-pad-15 ori-font-sm textInputField" autosize={{ minRows: 1, maxRows: 3 }} name="input_message" value={input_message} onKeyDown={this.inputKeyDown} onChange={this.handleInputChange} />
                                <Button className={classNames("ori-absolute ori-no-pad ori-border-radius-half ori-flex-row ori-flex-center alignSendBtn", { "ori-btn-fill-primary": input_message.trim().length > 0 })} disabled={input_message.trim().length === 0} htmlType="submit">
                                    <PaperPlane size={28} />
                                </Button>
                            </Form>
                        </div>
                    }
                </div>
                <Modal className={classNames("chatInterfaceModal", { "insightSpecificModalClass": show_insight })} visible={visible} title={modal_title} footer={null} onCancel={this.closeModal}>
                    {
                        show_insight &&
                        <Insight nlp_details={nlp_details} actions={actions} active_popup_message={active_popup_message} closeModal={this.closeModal} updateMessageIntent={this.updateMessageIntent} addEntity={this.addEntity} updateEntityType={this.updateEntityType} deleteEntity={this.deleteEntity} />
                    }
                </Modal>
            </div>
        );
    }
}

ChatInterface.propTypes = {
    messages: PropTypes.array.isRequired,
    hide_admin_control: PropTypes.bool,
    nlp_details: PropTypes.object,
    actions: PropTypes.object,
    active_chat_item: PropTypes.object,
    admin_details: PropTypes.object,
    handleTakeover: PropTypes.func,
    handleRelinquish: PropTypes.func,
    handleChatInputMsgSend: PropTypes.func,
    handleChatInterface: PropTypes.func,
    handleChatInterfaceControl: PropTypes.func,
    fade_in: PropTypes.bool,
    zoom_in: PropTypes.bool,
};

ChatInterface.defaultProps = {
    hide_admin_control: false,
};

