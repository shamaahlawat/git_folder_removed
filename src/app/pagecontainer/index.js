import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Layout } from 'antd';

import './index.scss';

import * as pageActions from '../../data/redux/page_details/actions';
import * as adminActions from '../../data/redux/admin_details/actions';

import { APP_LAYOUT } from '../../data/config/constants';

import AppHeader from '../../components/appheader';
import AppSider from '../../components/appsider';

const { Header, Sider, Content } = Layout;

function mapStateToProps(state) {
    return {
        page_details: state.page_details,
        admin_details: state.admin_details
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, pageActions, adminActions), dispatch)
    };
}

class PageContainer extends Component {
    constructor() {
        super();
        this.onCollapse = this.onCollapse.bind(this);

        this.state = {
            sider_collapsed: true,
        };
    }

    onCollapse = (collapse, type) => {
        if (type.toLowerCase() === "clicktrigger") {
            this.setState({
                sider_collapsed: !this.state.sider_collapsed
            });
        }
    };

    navigateTo = (path) => {
        this.props.history.push(path);
    };

    render() {
        let { sider_collapsed } = this.state;
        const { page_details, admin_details, actions } = this.props;
        const collapsed_width = page_details.device_data.screen_width >= 768 ?  APP_LAYOUT.APP_SIDER_COLLAPSE_WIDTH : 0;
        const screen_height = page_details.device_data.screen_height;

        return (
            <Layout className="oriAppLayoutContainer" style={{ minHeight: `${screen_height}px` }}>
                <Header className="ori-fixed ori-full-width ori-box-shadow ori-flex-row ori-flex-jfe appHeaderContainer" style={{ height: `${APP_LAYOUT.APP_HEADER_HEIGHT}px`, lineHeight: `${APP_LAYOUT.APP_HEADER_HEIGHT}px`}}>
                    <AppHeader page_details={page_details} admin_details={admin_details} actions={actions} />
                </Header>
                <Sider className="ori-fixed appSiderContainer" style={{ height: screen_height }} breakpoint="md" collapsible defaultCollapsed={true} collapsed={sider_collapsed} collapsedWidth={collapsed_width} onCollapse={this.onCollapse}>
                    <AppSider page_details={page_details} navigateTo={this.navigateTo} history={this.props.history} sider_collapsed={sider_collapsed} />
                </Sider>
                <Layout className="contentLayoutContainer" style={{ paddingTop: `${APP_LAYOUT.APP_HEADER_HEIGHT}px`, paddingLeft: `${collapsed_width}px`}}>
                    {
                        !sider_collapsed &&
                        <div className="ori-animated ori-fade-in ori-absolute ori-bg-black-light overlay" onClick={() => this.setState({ sider_collapsed: true })}>&nbsp;</div>
                    }
                    <Content className="ori-full-width ori-overflow-auto mainContentContainer" style={{ height: `${screen_height - APP_LAYOUT.APP_HEADER_HEIGHT}px`}}>
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

PageContainer.propTypes = {
    actions: PropTypes.object,
    page_details: PropTypes.object,
    admin_details: PropTypes.object,
    history: PropTypes.object,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(PageContainer));
