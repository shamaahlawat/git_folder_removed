import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class InlineItem extends Component {
    render() {
        let { title, info, uppercase, url, title_bold, left_full_flex, right_full_flex, size } = this.props;

        return (
            <div className={classNames("ori-flex-row ori-flex-jsb ", { "ori-font-xs": size === 'small', "ori-font-md": size === 'large' })} >
                <div className={classNames("ori-word-break", { "ori-uppercase": uppercase, "ori-capitalize": !uppercase, "ori-full-flex": left_full_flex, })}>
                    <span className={classNames({ "ori-font-bold": title_bold })}>{title}</span>
                </div>
                <div className={classNames("ori-word-break ori-l-pad-5 ori-flex-row ori-flex-jfe", { "ori-full-flex": right_full_flex })}>
                    <a href={url ? info : ""} target="_blank" className={classNames("ori-font-light", { "ori-link-primary": url })}>{info}</a>
                </div>
            </div>
        );
    }
}

InlineItem.propTypes = {
    title: PropTypes.string.isRequired,
    info: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    url: PropTypes.bool,
    uppercase: PropTypes.bool,
    title_bold: PropTypes.bool,
    left_full_flex: PropTypes.bool,
    right_full_flex: PropTypes.bool,
    size: PropTypes.string
};

InlineItem.defaultProps = {
    uppercase: false,
    title_bold: true,
    left_full_flex: false,
    right_full_flex: false,
    size: 'default',
    url: false,
};
