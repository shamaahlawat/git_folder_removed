import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DatePicker, Icon, Tooltip, Badge } from 'antd';
import ReactDOM from "react-dom";
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import flattenDeep from 'lodash/flattenDeep';
import InfiniteScroll from 'react-infinite-scroll-component';

import './index.scss';

import { MODULE_DATA } from '../../../../../data/config/constants';

import CloseTag from '../../../../../components/closetag';
import ShowMessage from '../../../../../components/showmessage';
import ConversationItem from '../../../components/conversationitem';
import ConversationItemLoader from '../../../components/conversationitem/loaders';
import Filters from '../../../components/filters';

const { RangePicker } = DatePicker;

export default class HistoryList extends Component {
    constructor() {
        super();
        this.showFilterLayout = this.showFilterLayout.bind(this);
        this.hideFilterLayout = this.hideFilterLayout.bind(this);

        this.state = {
            filter_visibility: {
                visible: false,
                animation: 'ori-translate-down',
            }
        };
    }

    componentWillUpdate() {
        this.getHeaderContainerHeight();
    }

    getHeaderContainerHeight = () => {
        const node = ReactDOM.findDOMNode(this.headerContainer);
        if (node) {
            this.headerContainerHeight = node.offsetHeight;
        }
    }

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

    getProcessedSelectedFilters = () => {
        const { selected_filters } = this.props;
        const selected_filter_keys = Object.keys(selected_filters);
        let filters = {};
        if (selected_filter_keys.length > 0) {
            selected_filter_keys.forEach((key) => {
                if (selected_filters[key].length > 0) {
                    selected_filters[key].forEach((filter_item) => {
                        if (filters[key] === undefined || filters[key] === null) {
                            filters[key] = [];
                        }
                        filters[key] = [...filters[key], filter_item.value];
                    })
                }
            });
        }
        return filters;
    };

    handleDateRangeChange = (value) => {
        let { actions } = this.props;
        let processed_filters = this.getProcessedSelectedFilters();
        let payload = {
            skip: 0,
            required: MODULE_DATA.HISTORY.LOAD_MORE_HISTORY_COUNT,
            filters: {
                ...processed_filters,
                startDate: value && value.length > 0 ? value[0] : "",
                endDate: value && value.length > 0 ? value[1] : "",
            }
        };
        actions.updateSelectedDateRange(value);
        actions.getChatHistory(payload);
    };

    handleFilterUpdate = (filterKey, value) => {
        let { actions } = this.props;
        let payload = { filterKey, value };
        actions.updateHistoryFilterSelection(payload);
    };

    handleClearFilter = () => {
        let { actions } = this.props;
        actions.clearHistoryFilter();
    };

    handleApplyFilter = () => {
        const { actions, selected_date_range } = this.props;
        let processed_filters = this.getProcessedSelectedFilters();
        let payload = {
            skip: 0,
            required: MODULE_DATA.HISTORY.LOAD_MORE_HISTORY_COUNT,
            filters: {
                ...processed_filters,
                startDate: selected_date_range && selected_date_range.length > 0 ? selected_date_range[0] : "",
                endDate: selected_date_range && selected_date_range.length > 0 ? selected_date_range[1] : "",
            }
        };
        this.hideFilterLayout();
        actions.getChatHistory(payload);
    };

    handleFilterTagClose = (filter_item) => {
        let { actions } = this.props;
        actions.removeHistoryFilterItem(filter_item).then(this.handleApplyFilter);
    };

    loadMoreHistory = () => {
        const { actions, selected_date_range, chat_history_list } = this.props;
        let processed_filters = this.getProcessedSelectedFilters();
        let payload = {
            skip: chat_history_list.length,
            required: MODULE_DATA.HISTORY.LOAD_MORE_HISTORY_COUNT,
            filters: {
                ...processed_filters,
                startDate: selected_date_range && selected_date_range.length > 0 ? selected_date_range[0] : "",
                endDate: selected_date_range && selected_date_range.length > 0 ? selected_date_range[1] : "",
            }
        };
        console.log('load more', payload);
        actions.loadMoreHistory(payload);
    };

    handleChatItemClicked = (current_item) => {
        const { actions } = this.props;
        const payload = { sessionId: current_item.sessionId };
        actions.setCurrentHistoryChatItem(current_item);
        actions.getCurrentChatHistory(payload);
    };

    render() {
        const { filter_visibility } = this.state;
        const { selected_date_range, chat_history_list, load_more_history, total_history_count, screen_height, filters, selected_filters, current_session_id } = this.props;
        const header_container_height = this.headerContainerHeight ? this.headerContainerHeight : 60;
        const app_header_height = 60;
        const is_selected_filters_empty = (isEmpty(selected_filters) || (!isEmpty(selected_filters) && flattenDeep(Object.values(selected_filters)).length === 0));

        return (
            <div className="ori-relative ori-full-width ori-full-parent-height oriHistoryListContainer">
                <div className="ori-relative ori-b-border-light historyHeaderContainer" ref={el => { this.headerContainer = el; }}>
                    <RangePicker className="ori-b-mrgn-5 ori-full-width rangePickerContainer" format="DD-MM-YYYY" placeholder={['Start Date', 'End Date']} value={selected_date_range} onChange={this.handleDateRangeChange} />
                    {
                        !filter_visibility.visible &&
                        <div className="ori-absolute ori-animated ori-fade-in ori-cursor-ptr ori-lr-pad-5 alignFilter" onClick={() => { this.showFilterLayout(); }}>
                            <Badge className="historyBadge" count={total_history_count - chat_history_list.length } overflowCount={9999}>
                                <div className="ori-font-light ori-flex-column alignHeaderIcon">
                                    <Tooltip title={<span className="ori-font-xs"> {total_history_count} Chat history found</span>}>
                                        <Icon type="filter" className="ori-font-18" />
                                    </Tooltip>
                                    <p className="title">FILTER</p>
                                </div>   
                            </Badge>
                        </div>
                    }
                    {
                        filter_visibility.visible &&
                        <div className="ori-absolute ori-animated ori-fade-in ori-cursor-ptr ori-lr-pad-5 ori-font-light ori-flex-column alignHeaderIcon alignClose" onClick={() => { this.hideFilterLayout(); }}>
                            <Icon type="close" />
                        </div>
                    }

                    <div className="ori-lr-pad-5 ori-flex-row ori-flex-wrap closeTagContainer">
                        {
                            !is_selected_filters_empty &&
                            flattenDeep(Object.values(selected_filters)).map((item, index) => {
                                return (
                                    <div key={index} className="ori-animated ori-zoom-in ori-b-mrgn-5 ori-r-mrgn-5">
                                        <CloseTag tag_item={item} handleTagClose={this.handleFilterTagClose} label={item.label} type="default" size="small" shape="capsule" />
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
                <div className={classNames("ori-relative", { "ori-display-none": !filter_visibility.visible })}>
                    <div className="ori-absolute ori-overflow-hidden filterWrapper" style={{ height: screen_height - app_header_height - header_container_height }}>
                        <div className="ori-relative ori-full-parent-height">
                            <div className={classNames(`ori-absolute  ori-animated ori-bg-white filterOptionContainer ${filter_visibility.animation}`)}>
                                <Filters filter_container_height={header_container_height} screen_height={screen_height} filters={filters} selected_filters={selected_filters} handleFilterUpdate={this.handleFilterUpdate} handleFilterTagClose={this.handleFilterTagClose} handleClearFilter={this.handleClearFilter} handleApplyFilter={this.handleApplyFilter} />
                            </div>
                        </div>
                    </div>
                </div>
                {
                    chat_history_list && chat_history_list.length === 0 &&
                    <div className="ori-absolute alignNoHistoryFound">
                        <ShowMessage message="No chat history found" sad fade_item />
                    </div>
                }
                {
                    chat_history_list && chat_history_list.length > 0 &&
                    <div id="historyItemsContainer" className="ori-overflow-auto" style={{ maxHeight: screen_height - app_header_height - header_container_height }} >
                        <InfiniteScroll scrollableTarget="historyItemsContainer" dataLength={chat_history_list.length} hasMore={load_more_history} scrollThreshold={0.9} loader={<ConversationItemLoader />} next={this.loadMoreHistory} >
                            {
                                chat_history_list.map((chat_item) => {
                                    return (
                                        <ConversationItem key={chat_item.sessionId} chat_item={chat_item} handleChatItemClicked={this.handleChatItemClicked} active={current_session_id && current_session_id === chat_item.sessionId} fade_in />
                                    );
                                })
                            }
                        </InfiniteScroll>
                    </div>
                }
            </div>
        );
    }
}

HistoryList.propTypes = {
    actions: PropTypes.object,
    selected_date_range: PropTypes.array,
    chat_history_list: PropTypes.array,
    load_more_history: PropTypes.bool,
    total_history_count: PropTypes.number,
    current_session_id: PropTypes.string,
    screen_height: PropTypes.number,
    filters: PropTypes.array.isRequired,
    selected_filters: PropTypes.object.isRequired,
};
