import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as pageActions from '../data/redux/page_details/actions';
import * as UTILS from '../data/config/utils';

import SpinnerLoader from '../components/spinnerloader';

function mapStateToProps(state) {
    return {
        page_details: state.page_details,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, pageActions), dispatch)
    };
}

class App extends Component {

    componentWillMount() {
        const systLang = UTILS.getLang();
        this.props.actions.setDeviceData(UTILS.checkDevice.deviceStatus());
        if (systLang) {
            this.props.actions.setLang(systLang);
        }
        this.timeout = false;
    }

    componentDidMount() {
        let self = this;
        window.addEventListener("resize", () => {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                self.props.actions.setDeviceData(UTILS.checkDevice.deviceStatus());
            }, 300);
        });
    }

    render() {
        const { page_details } = this.props;

        return (
            <div className="ori-full-width ori-relative">
                {
                    page_details.loaders.page_loading &&
                    <div className="ori-absolute ori-bg-black-light ori-align-full ori-zindex-150">
                        <SpinnerLoader text={page_details.loaders.page_loading_text} bg_white/>
                    </div>
                }
                {this.props.children}
            </div>
        );
    }
}

App.propTypes = {
    actions: PropTypes.object,
    page_details: PropTypes.object,
    history: PropTypes.object,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(App));
