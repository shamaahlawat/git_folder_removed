import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './index.scss';

import * as pageActions from '../../../data/redux/page_details/actions';
import * as adminActions from '../../../data/redux/admin_details/actions';
import { APP_PAGES, ORIENTATION } from '../../../data/config/constants';
import { assets } from '../../../data/assets/assetsurl';

import LoginForm from './components/loginform';

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

class Login extends Component {
    componentWillMount() {
        let { actions } = this.props;
        actions.pageChanged(APP_PAGES.LOGIN, 'ORI Dashboard');
    }

    render() {
        const { page_details, admin_details, actions, history } = this.props;
        const is_mobile = page_details.device_data.screen_width < 768;
        const screen_height = page_details.device_data.screen_height;
        const orientation = window.screen.width > window.screen.height ? ORIENTATION.LANDSCAPE : ORIENTATION.PORTRAIT;

        return (
            <div className={classNames("oriLoginContainer", { "ori-flex-row ori-full-min-height ori-flex-center": !is_mobile && orientation === ORIENTATION.LANDSCAPE })}>
                <div className={classNames("ori-box-shadow loginContentContainer", { "ori-flex-row loginContentLandscape": orientation === ORIENTATION.LANDSCAPE, "ori-flex-cr loginContentPortrait": orientation === ORIENTATION.PORTRAIT })}
                    style={{ minHeight: is_mobile && orientation === ORIENTATION.LANDSCAPE ? screen_height : "" }}>
                    <div className={classNames("ori-pad-15 loginFormContainer")}>
                        <div className="ori-pad-10 ori-flex-row ori-flex-jc">
                            <img src={assets.oriLogo} alt="" className="ori-animated ori-zoom-in oriLogo" />
                        </div>
                        <div className="ori-t-mrgn-20 loginForm">
                            <LoginForm actions={actions} admin_details={admin_details} history={history} />
                        </div>
                    </div>
                    <div className={classNames("loginImageContainer")}>
                        <img src={assets.loginBg} alt="" className={classNames("ori-animated ori-zoom-in ori-img-contain")} />
                    </div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    page_details: PropTypes.object,
    admin_details: PropTypes.object,
    actions: PropTypes.object,
    history: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(Login);