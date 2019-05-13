import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import classNames from 'classnames';


export default class CloseTag extends Component {
    render() {
        let { tag_item, handleTagClose, label, size, shape, type } = this.props;

        return (
            <div className={classNames("ori-flex-row ori-lr-pad-6 oriCloseTagContainer", { "ori-font-11": size === "small", "ori-font-xs": size === "default", "ori-font-sm": size === "large", "ori-border-radius-4": shape === "box", "ori-border-radius-10": shape === 'capsule', "ori-border-light ori-bg-default": type === "default", "ori-font-primary ori-bg-white ori-border-primary": type === "primary", "ori-font-white ori-border-primary ori-bg-primary": type === "primary-fill" })}>
                <div className="ori-r-pad-3">{label}</div>
                <div className={classNames("ori-l-pad-2 ori-cursor-ptr",{"ori-l-border-light": type === "default","ori-l-border-primary": type === "primary" })} onClick={() => handleTagClose(tag_item)}>
                    <Icon type="close" />
                </div>
            </div>
        );
    }
}

CloseTag.propTypes = {
    tag_item: PropTypes.object,
    handleTagClose: PropTypes.func,
    label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    disable: PropTypes.bool,
    size: PropTypes.string,
    shape: PropTypes.string,
    type: PropTypes.string,
};

CloseTag.defaultProps = {
    disable: false,
    size: "default",
    shape: "box",
    type: "default",
};
