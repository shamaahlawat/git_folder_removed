import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Menu } from 'antd';

import './index.scss';

import { assets, icons } from '../../data/assets/assetsurl';
import { APP_PAGES, ROUTE_PATH } from '../../data/config/constants';

const SubMenu = Menu.SubMenu;

const { DashboardMeter, Conversation, History, BarChart } = icons;

export default class AppSider extends Component {
    render() {
        const { page_details, navigateTo, sider_collapsed } = this.props;

        return (
            <div className="ori-full-width ori-full-parent-height oriAppSiderContainer">
                <div className="ori-pad-10 ori-flex-column ori-flex-jc ori-b-mrgn-20 logoContainer">
                    <img src={assets.oriLogo} alt="" className="ori-animated ori-zoom-in ori-full-width" />
                </div>
                <Menu mode="inline" className="ori-full-width siderMenu">
                    <Menu.Item key={APP_PAGES.DASHBOARD} className={classNames("siderMenuItem", { "ori-animated ori-zoom-in": sider_collapsed })}>
                        <span className={classNames("menuIcon", { "activeMenu": sider_collapsed && page_details.current_page === APP_PAGES.DASHBOARD, "ori-font-primary ori-font-bold": !sider_collapsed && page_details.current_page === APP_PAGES.DASHBOARD })} onClick={() => { navigateTo(ROUTE_PATH.DASHBOARD); }}>
                            <span className="anticon">
                                <DashboardMeter size={20} />
                            </span>
                            <span className="ori-capitalize">{APP_PAGES.DASHBOARD}</span>
                        </span>
                    </Menu.Item>
                    <Menu.Item key={APP_PAGES.CONVERSATION} className={classNames("siderMenuItem", { "ori-animated ori-zoom-in": sider_collapsed })}>
                        <span className={classNames("menuIcon", { "activeMenu": sider_collapsed && page_details.current_page === APP_PAGES.CONVERSATION, "ori-font-primary ori-font-bold": !sider_collapsed && page_details.current_page === APP_PAGES.CONVERSATION })} onClick={() => { navigateTo(ROUTE_PATH.CONVERSATION); }}>
                            <span className="anticon">
                                <Conversation size={20} />
                            </span>
                            <span className="ori-capitalize">{APP_PAGES.CONVERSATION}</span>
                        </span>
                    </Menu.Item>
                    <Menu.Item key={APP_PAGES.CHAT_HISTORY} className={classNames("siderMenuItem", { "ori-animated ori-zoom-in": sider_collapsed })}>
                        <span className={classNames("menuIcon", { "activeMenu": sider_collapsed && page_details.current_page === APP_PAGES.CHAT_HISTORY, "ori-font-primary ori-font-bold": !sider_collapsed && page_details.current_page === APP_PAGES.CHAT_HISTORY })} onClick={() => { navigateTo(ROUTE_PATH.CHAT_HISTORY); }}>
                            <span className="anticon">
                                <History size={20} />
                            </span>
                            <span className="ori-capitalize">{APP_PAGES.CHAT_HISTORY}</span>
                        </span>
                    </Menu.Item>
                    <SubMenu key={APP_PAGES.ANALYTICS} className="siderSubMenu"
                        title={
                            <span className={classNames("ori-pad-5", { "activeMenu": sider_collapsed && (page_details.current_page === APP_PAGES.USAGE_ANALYTICS || page_details.current_page === APP_PAGES.CHATLOG_ANALYTICS), "ori-font-primary ori-font-bold": !sider_collapsed && (page_details.current_page === APP_PAGES.USAGE_ANALYTICS || page_details.current_page === APP_PAGES.CHATLOG_ANALYTICS)
                            })} onClick={() => { if (sider_collapsed) { navigateTo(ROUTE_PATH.USAGE_ANALYTICS); } }}>
                                <span className="anticon">
                                    <BarChart size={20} />
                                </span>
                                <span className="ori-capitalize">{APP_PAGES.ANALYTICS}</span>
                            </span>
                        }>
                        <Menu.Item key={APP_PAGES.USAGE_ANALYTICS} className={classNames({ "ant-menu-item-selected": page_details.current_page === APP_PAGES.USAGE_ANALYTICS })}>
                            <div className="ori-capitalize" onClick={() => { navigateTo(ROUTE_PATH.USAGE_ANALYTICS); }}>{APP_PAGES.USAGE_ANALYTICS}</div>
                        </Menu.Item>
                        <Menu.Item key={APP_PAGES.CHATLOG_ANALYTICS} className={classNames({ "ant-menu-item-selected": page_details.current_page === APP_PAGES.CHATLOG_ANALYTICS })}>
                            <div className="ori-capitalize" onClick={() => { navigateTo(ROUTE_PATH.CHATLOG_ANALYTICS); }}>{APP_PAGES.CHATLOG_ANALYTICS}</div>
                        </Menu.Item>
                        <Menu.Item key={APP_PAGES.SESSION_FLOW} className={classNames({ "ant-menu-item-selected": page_details.current_page === APP_PAGES.SESSION_FLOW })}>
                            <div className="ori-capitalize" onClick={() => { navigateTo(ROUTE_PATH.SESSION_FLOW); }}>{APP_PAGES.SESSION_FLOW}</div>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        );
    }
}

AppSider.propTypes = {
    page_details: PropTypes.object,
    navigateTo: PropTypes.func,
    sider_collapsed: PropTypes.bool,
};

