import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Spin } from 'antd';
import classNames from 'classnames';

import './index.scss';

export default class SpinnerLoader extends Component {
    render() {
        let { text, size, bg_white, primary_overlay } = this.props;

        return (
            <Row className={classNames("spinnerLoaderContainer", { "ori-bg-primary-overlay": primary_overlay})}>
                <Col xs={{ span: 24 }} className="ori-flex-column ori-flex-center heightFull ">
                    <div className={classNames(" ori-flex-row ori-flex-jc ori-border-radius-4", { "ori-bg-white ori-box-shadow": bg_white, "ori-pad-20": size === 'large' , "ori-pad-15": size !== 'large'})}>
                        <Spin size={size} className="ori-flex"/>
                        {
                            text.trim().length > 0 && 
                            <div className="ori-flex-column ori-flex-jc">
                                <p className={classNames("ori-l-mrgn-15 ori-capitalize ori-font-primary", { "ori-font-xs": size === 'small', "ori-font-sm": size !== "small" })}> {text + "..."}</p>
                            </div>
                        }
                    </div>
                </Col>
            </Row>
        );
    }
}

SpinnerLoader.propTypes = {
    text: PropTypes.string,
    size: PropTypes.oneOf(['large', 'small', 'default']),
    bg_white: PropTypes.bool,
    primary_overlay: PropTypes.bool
};

SpinnerLoader.defaultProps = {
    text: "",
    size: "default",
    bg_white: false,
    primary_overlay: false
};