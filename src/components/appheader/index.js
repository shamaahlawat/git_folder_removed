import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Menu, Dropdown, Avatar, Badge, Icon, Switch, Input } from 'antd';

import './index.scss';

import { assets } from '../../data/assets/assetsurl';
// import { refreshPage } from '../../data/config/utils';

const Search = Input.Search;

class AppHeader extends Component {
    render() {
        const { page_details, admin_details, actions } = this.props;
        const is_mobile = page_details.device_data.screen_width < 768;
        const admin_fname = admin_details.user_info && admin_details.user_info.firstName ? admin_details.user_info.firstName : "unknown";

        return (
            <div className={classNames("ori-full-width ori-full-parent-height ori-flex-row ori-flex-jsb oriAppHeaderContainer")}>
                {
                    is_mobile &&
                    <div className="ori-pad-10 ori-flex-column ori-flex-jc headerIconContainer">
                        <img src={assets.oriLogo} alt="" className="ori-full-width" />
                    </div>
                }
                {
                    !is_mobile &&
                    <div className=" ori-pad-10 ori-flex-column ori-flex-jc pageTitleContainer">
                        <p className="ori-capitalize ori-font-md ori-l-pad-10">{page_details.page_title}</p>
                    </div>
                }
                <div className="headerContentContainer">
                    <ul className="ori-no-b-mrgn ori-no-l-pad ori-flex navList">
                        <li className={classNames("searchContainer navItem")}>
                            <Search placeholder="Type in to search.." className="searchBox" /*onSearch={value => { console.warn(value) }}*/ />
                        </li>
                        <li className={classNames("ori-mobile-hidden navItem")}>
                            <Switch size="small" />
                            <span className="ori-l-mrgn-5 ori-uppercase ori-font-bold ori-font-xs status">ONLINE</span>
                        </li>
                        <li className={classNames("navItem")}>
                            <Badge count={10} dot className="badgeAlign">
                                <i className="material-icons ori-font-lg">notifications</i>
                            </Badge>
                        </li>
                        <li className={classNames("navItem")}>
                            <Dropdown overlay={
                                <Menu className="dropdownMenuList">
                                    <Menu.Item key="logout" className="ori-no-mrgn">
                                        <p onClick={() => actions.logoutUser()}>Log out</p>
                                    </Menu.Item>
                                </Menu>
                            } placement="bottomRight" trigger={['click']} style={{ display: 'flex' }}>
                                <div>
                                    <Avatar className="ori-bg-primary ori-capitalize" >{admin_fname.charAt(0)}</Avatar>
                                    <span className="ori-mobile-hidden ori-capitalize ori-l-pad-5 ori-font-medium"> {admin_fname} <Icon type="down" className="ori-l-pad-5 ori-font-md" />
                                    </span>
                                </div>
                            </Dropdown>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

AppHeader.propTypes = {
    page_details: PropTypes.object,
    admin_details: PropTypes.object,
    actions: PropTypes.object,
};

export default AppHeader;
