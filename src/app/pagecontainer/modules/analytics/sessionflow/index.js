import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tree from 'react-d3-tree';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Tooltip } from 'antd';
import isEmpty from 'lodash/isEmpty';

import './index.scss';

import * as pageActions from '../../../../../data/redux/page_details/actions';
import * as sessionFlowActions from '../../../../../data/redux/session_flow_details/actions';

import { APP_PAGES } from '../../../../../data/config/constants';

import PageHeader from '../../../../../components/pageheader';

function mapStateToProps(state) {
    return {
        page_details: state.page_details,
        session_flow_details: state.session_flow_details
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, pageActions, sessionFlowActions), dispatch)
    };
}

const TooltipBody = (props) => {
    return(
        <div className="ori-full-width" >
            {
                props.tooltip_data.percentage &&
                <div className="ori-pad-5">
                    <p className="ori-font-xs">% of session </p>
                    <p className="ori-font-sm ori-font-primary">{props.tooltip_data.percentage}</p>
                </div>
            }
            {
                props.tooltip_data.count &&
                <div className="ori-pad-5">
                    <p className="ori-font-xs">num of sessions </p>
                    <p className="ori-font-sm ori-font-primary">{props.tooltip_data.count}</p>
                </div>
            }
            {
                props.tooltip_data.exit &&
                <div className="ori-pad-5">
                    <p className="ori-font-xs">% of session exit </p>
                    <p className="ori-font-sm ori-font-danger">{props.tooltip_data.exit}</p>
                </div>
            }
        </div>
    );
}

const TreeNode = ({ nodeData }) => {

    return (
        <div className={classNames("ori-flex oriTreeNodeContainer")}>
            <Tooltip placement="right" overlayClassName="treeNodeTooltip" title={<TooltipBody tooltip_data={nodeData.attributes} />}>
                <div size="small" className={classNames(" ori-font-xs ori-lr-pad-10 ori-tb-pad-7", { "ori-bg-green-light ori-font-green  ori-border-radius-10 ori-border-light": isEmpty(nodeData._children), "ori-font-white ": !isEmpty(nodeData._children), 
                "ori-bubble-border-radius ori-bg-primary": !isEmpty(nodeData._children) && nodeData.type !== "root","ori-bg-green ori-border-radius-4": nodeData.type && nodeData.type === "root" })}>
                    <span> {nodeData.name} </span>
                </div>
            </Tooltip>
        </div>
    );
};

class SessionFlow extends Component {
    componentWillMount() {
        const { actions } = this.props;
        actions.pageChanged(APP_PAGES.SESSION_FLOW, APP_PAGES.ANALYTICS);
    }

    componentDidMount() {
        const { actions, session_flow_details } = this.props;
        if (isEmpty(session_flow_details.session_flow)) {
            const payload = {
                startDate: session_flow_details.session_flow_filters.date_range[0],
                endDate: session_flow_details.session_flow_filters.date_range[1],
            };
            actions.getSessionFlowData(payload);
        }
    }

    handleSessionFlowDateRangeChange = (date_range) => {
        const { actions, chatlog_details } = this.props;
        const payload = {
            startDate: date_range[0],
            endDate: date_range[1],
        };
        actions.getSessionFlowData(payload, actions.updateSessionFlowFilter(date_range, "session_flow_filters.date_range") );
        
    };

    render() {
        const { page_details, session_flow_details } = this.props;

        return (
            <div className="oriSessionFlowContainer">
                <PageHeader screen_width={page_details.device_data.screen_width} title="Session Flow" show_date_range date_range={session_flow_details.session_flow_filters.date_range} handleDateRangeChange={this.handleSessionFlowDateRangeChange} paper_plane />
                {
                    !isEmpty(session_flow_details.session_flow) &&
                    <div className="ori-pad-15 ori-full-width" style={{ height: page_details.device_data.screen_height * 1.4 }} ref={tc => (this.treeContainer = tc)}>
                    <Tree data={session_flow_details.session_flow} initialDepth={1} styles={{ links: { stroke: '#9999994d', strokeWidth: 7 } }} separation={{siblings: 0.5, nonSiblings: 1}} nodeSvgShape={{ shape: "none" }} translate={{ x: 100, y: (page_details.device_data.screen_height * 1.2) / 2 }} nodeSize={{x:150, y: 100}} nodeLabelComponent={{ render: <TreeNode />, foreignObjectWrapper: { style: { width: "150px", height: "75px",  x: -80, y: -20 } } }} allowForeignObjects />
                </div>
                }
            </div>
        );
    }
}

SessionFlow.propTypes = {
    actions: PropTypes.object,
    page_details: PropTypes.object,
    history: PropTypes.object,
    match: PropTypes.object,
};

TreeNode.propTypes = {
    nodeData: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(SessionFlow);


const data =[
    {
        type: "root",
        "name": "Session Start",
        "attributes": {
            "drop": "N/A",
            "count": 3972,
            "percentage": "100 %"
        },
        "children":
            [
                {
                    "name": "rechargeoffers->start",
                    "attributes": {
                        "count": 1288,
                        "percentage": "32.4 %",
                        exit: "5 %"
                    }
                },
                {
                    "name": "recharge breakup->start",
                    "attributes": {
                        "count": 243,
                        "percentage": "6.1 %"
                    }
                },
                {
                    "name": "recharge->start",
                    "attributes": {
                        "count": 604,
                        "percentage": "15.2 %"
                    }
                },
                {
                    "name": "currentbalance->start",
                    "attributes": {
                        "count": 542,
                        "percentage": "13.6 %"
                    }
                },
                {
                    "name": "rechargehistory->start",
                    "attributes": {
                        "count": 54,
                        "percentage": "1.3 %"
                    }
                },
                {
                    "name": "switchoffdate->start",
                    "attributes": {
                        "count": 91,
                        "percentage": "2.2 %"
                    }
                }
            ]
    }];
        