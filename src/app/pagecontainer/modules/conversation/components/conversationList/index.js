import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Collapse, Icon, Tooltip } from 'antd';
import isEmpty from 'lodash/isEmpty';
import flattenDeep from 'lodash/flattenDeep';
import ReactDOM from "react-dom";

import './index.scss';

import { SOCKET_EVENTS, PANEL_KEY } from '../../../../../../data/config/constants';
import { showMessage } from '../../../../../../data/config/utils';
import { icons } from '../../../../../../data/assets/assetsurl';

import CloseTag from '../../../../../../components/closetag';
import Filters from '../../../../components/filters';
import ConversationItem from '../../../../components/conversationitem';

const Panel = Collapse.Panel;
const { Message } = icons;

export default class ConversationList extends Component {
    constructor() {
        super();
        this.state = {
            filter_visibility: {
                visible: false,
                animation: 'ori-translate-down',
            },
        };
    }

    componentWillUpdate() {
        const node = ReactDOM.findDOMNode(this.tagContainer);
        if (node) {
            this.tagContainerHeight = node.offsetHeight;
        }
    }

    handleChatItemClicked = (current_item) => {
        const { admin_id, actions, socket, handleChatInterface } = this.props;
        actions.setCurrentChatItem(current_item);
        let data = {
            psid: current_item.psid,
            adminId: admin_id
        };
        socket.emit(SOCKET_EVENTS.JOIN_ROOM, data, (res) => {
            console.log(res);

            if (res.data) {
                handleChatInterface(true);
                actions.joinedToChatroom(res.data);
            }
            if (res.error) { showMessage('error', 'unable to join chatroom'); }
        });
    };

    showFilterLayout = () => {
        this.setState({
            filter_visibility: {
                ...this.state.filter_visibility,
                visible: true,
                animation: 'ori-translate-down'
            }
        });
    };

    hideFilterLayout = () => {
        this.setState({
            filter_visibility: {
                ...this.state.filter_visibility,
                animation: 'ori-fade-out-up',
            }
        }, () => {
            setTimeout(() => {
                this.setState({
                    filter_visibility: {
                        ...this.state.filter_visibility,
                        visible: false
                    }
                });
            }, 400)
        });
    };

    handleFilterUpdate = (filterKey, value) => {
        let { actions } = this.props;
        let payload = { filterKey, value };
        actions.updateConversationFilterSelection(payload);
    };

    handleFilterTagClose = (filter_item) => {
        let { actions } = this.props;
        actions.removeConversationFilterItem(filter_item);
    };

    handleClearFilter = () => {
        let { actions } = this.props;
        actions.clearConversationFilter();
    };

    handleApplyFilter = () => {
        let { actions } = this.props;
        this.hideFilterLayout();
        actions.clearActiveChatDetails();
    };

    shouldFilter = (key, filter_array, chatItem) => {
        if (chatItem[key]) {
            if (key === 'noOfMessages') {
                return filter_array.findIndex((item) => { return item.value <= chatItem[key] }) !== -1;
            } else if (key === 'botEvents') {
                let bool = true;
                filter_array.forEach((filter_item) => {
                    let index = chatItem[key].findIndex((item) => { return item.tag && item.tagType && item.tag === filter_item.value.tag && item.tagType === filter_item.value.tagType });
                    if (index === -1) {
                        bool = false;
                    }
                });
                return bool;
            } else {
                return filter_array.findIndex((item) => { return item.value === chatItem[key] }) !== -1;
            }
        } else {
            return false;
        }
    };

    filterChatItem = (chatItem) => {
        const { selected_filters } = this.props;
        let bool = true;
        const selected_filter_keys = Object.keys(selected_filters);
        selected_filter_keys.forEach((key) => {
            if (selected_filters[key].length > 0) {
                bool = bool && this.shouldFilter(key, selected_filters[key], chatItem);
            }
        });
        return bool;
    };

    render() {
        const { filter_visibility, isActive } = this.state;
        const { filters, live_chat_details, overtaken_chat_details, selected_filters, active_chat_item, is_chatinterface_visible, screen_height, handlePanelCollapse, activePanelKey } = this.props;
        const is_selected_filters_empty = (isEmpty(selected_filters) || (!isEmpty(selected_filters) && flattenDeep(Object.values(selected_filters)).length === 0));
        const filter_container_height = this.tagContainerHeight ? this.tagContainerHeight : 60;
        const liveChatListHeight = Object.keys(live_chat_details).length !== 0 ? 55 : 0;
        const overtakenListHeight = Object.keys(overtaken_chat_details).length !== 0 ? 55 : 0;
        const totalOffsetForList = 60 + filter_container_height + liveChatListHeight + overtakenListHeight;

        const filter_live_chat = Object.keys(live_chat_details).filter((psid) => { return !is_selected_filters_empty ? this.filterChatItem(live_chat_details[psid]) : true; });

        const filter_overtaken_chat = Object.keys(overtaken_chat_details).filter((psid) => { return !is_selected_filters_empty ? this.filterChatItem(overtaken_chat_details[psid]) : true; });

        return (
            <div className="ori-full-width oriConversationListContainer">
                <div className="ori-relative ori-l-pad-10 ori-t-pad-10 ori-r-pad-30 ori-b-pad-5 ori-b-border-light ori-flex-row ori-flex-wrap filterTagContainer" ref={el => { this.tagContainer = el; }}>
                    {
                        !is_selected_filters_empty &&
                        flattenDeep(Object.values(selected_filters)).map((item, index) => {
                            return (
                                <div key={index} className="ori-animated ori-zoom-in ori-b-mrgn-5 ori-r-mrgn-5">
                                    <CloseTag tag_item={item} handleTagClose={this.handleFilterTagClose} label={item.label} type="primary-fill" size="small" shape="capsule" />
                                </div>
                            );
                        })
                    }
                    {
                        !filter_visibility.visible && is_selected_filters_empty &&
                        <div className="ori-animated ori-fade-in ori-absolute ori-font-md alignTitle"><span>Chat Stream</span></div>
                    }
                    {
                        !filter_visibility.visible &&
                        <div className="ori-absolute ori-animated ori-fade-in ori-cursor-ptr ori-lr-pad-5 ori-font-light ori-flex-column alignFilter" onClick={() => { this.showFilterLayout(); }}>
                            <Icon type="filter" />
                            <p className="title">FILTER</p>
                        </div>
                    }
                    {
                        filter_visibility.visible &&
                        <div className="ori-absolute ori-animated ori-fade-in ori-cursor-ptr ori-flex ori-pad-5 ori-font-light ori-font-md alignIcon" onClick={() => { this.hideFilterLayout(); }}>
                            <Tooltip placement="bottom" title={<span>close</span>}>
                                <Icon type="close" />
                            </Tooltip>
                        </div>
                    }
                </div>
                <div className="ori-relative accordianContainer">
                    <div className={classNames("ori-absolute ori-overflow-hidden filterWrapper", { "ori-display-none": !filter_visibility.visible })} style={{ minHeight: screen_height - 60 - filter_container_height }}>
                        <div className="ori-relative">
                            <div className={classNames(`ori-absolute  ori-animated ori-bg-white filterOptionContainer ${filter_visibility.animation}`)}>
                                <Filters filters={filters} selected_filters={selected_filters} handleFilterUpdate={this.handleFilterUpdate} handleClearFilter={this.handleClearFilter} handleApplyFilter={this.handleApplyFilter} filter_container_height={filter_container_height} screen_height={screen_height} />
                            </div>
                        </div>
                    </div>
                    <Collapse bordered={false} activeKey={activePanelKey} accordion onChange={(key)=> handlePanelCollapse(key)}>
                        {
                            !isEmpty(live_chat_details) &&
                            <Panel className="conversationPanel" isActive={isActive} header={<PanelHeader title="live" count={filter_live_chat.length} color="primary"  />} key={PANEL_KEY.LIVE_CHAT}>
                                <div style={{ maxHeight: screen_height - totalOffsetForList }} className="ori-overflow-auto">
                                    {
                                        filter_live_chat.map((psid, index) => {
                                            const chat_item = live_chat_details[psid];
                                            return (
                                                <ConversationItem key={index} chat_item={chat_item} handleChatItemClicked={this.handleChatItemClicked} active={active_chat_item && active_chat_item.psid && (active_chat_item.psid === chat_item.psid) && is_chatinterface_visible} fade_in />
                                            );
                                        })
                                    }
                                </div>
                            </Panel>
                        }
                        {
                            !isEmpty(overtaken_chat_details) &&
                            <Panel className="conversationPanel" header={<PanelHeader title="Taken Over" count={filter_overtaken_chat.length} color="green" />} key={PANEL_KEY.TAKE_OVER}>
                                <div style={{ maxHeight: screen_height - totalOffsetForList }} className="ori-overflow-auto">
                                    {
                                        filter_overtaken_chat.map((psid, index) => {
                                            const chat_item = overtaken_chat_details[psid];
                                            return (
                                                <ConversationItem key={index} chat_item={chat_item} handleChatItemClicked={this.handleChatItemClicked} active={active_chat_item && active_chat_item.psid && (active_chat_item.psid === chat_item.psid) && is_chatinterface_visible} fade_in />
                                            );
                                        })
                                    }
                                </div>
                            </Panel>
                        }
                    </Collapse>
                </div>
            </div>
        );
    }
}

const PanelHeader = (props) => {
    return (
        <div className="ori-flex-row ori-flex-jb">
            <div className="ori-flex-row ori-full-flex">
                <div className="ori-flex-column ori-flex-jc">
                    <Message size={16} className={classNames("ori-r-mrgn-5", { "ori-font-green": props.color === "green", "ori-font-primary": props.color === 'primary', "ori-font-warning": props.color === "warning" })} />
                </div>
                <p className="ori-capitalize">{props.title}</p>
            </div>
            <div className="ori-l-mrgn-5 ori-flex-column ori-flex-jc">
                <div className=" ori-lr-pad-5 ori-border-radius-10 ori-border-light ori-bg-default">{props.count}</div>
            </div>
        </div>
    );
}

PanelHeader.propTypes = {
    title: PropTypes.string,
    count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    color: PropTypes.string,
};

ConversationList.propTypes = {
    admin_id: PropTypes.string,
    live_chat_details: PropTypes.object,
    overtaken_chat_details: PropTypes.object,
    selected_filters: PropTypes.object,
    filters: PropTypes.array.isRequired,
    active_chat_item: PropTypes.object,
    actions: PropTypes.object,
    socket: PropTypes.object,
    handleChatInterface: PropTypes.func,
    handlePanelCollapse: PropTypes.func,
    activePanelKey: PropTypes.string,
    is_chatinterface_visible: PropTypes.bool,
    screen_height: PropTypes.number
};
