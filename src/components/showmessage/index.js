import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { assets } from '../../data/assets/assetsurl';

export default class ShowMessage extends Component {
    render() {
        const { message, fade_item, sad,  person, chatting, height, width } = this.props;

        return (
            <div className="ori-animated ori-fade-in ori-full-parent-height ori-pad-20 ori-flex-column ori-flex-center">
                <div className={classNames("ori-animated ori-zoom-in ori-b-mrgn-10",{"ori-opacity-medium": fade_item})}>
                    {
                        sad &&
                        <div style={{ height: height + 'px', width: width + 'px' }}>
                            <img src={assets.sad} alt="" className="ori-img-contain" />
                        </div>
                    }
                    {
                        person &&
                        <div style={{ height: height + 'px', width: width + 'px' }}>
                            <img src={assets.person} alt="" className="ori-img-contain" />
                        </div>
                    }
                    {
                        chatting &&
                        <div style={{ height: height + 'px', width: width + 'px' }}>
                            <img src={assets.chatting} alt="" className="ori-img-contain" />
                        </div>
                    }
                </div>
                <p>{message}</p>
            </div>
        );
    }
}

ShowMessage.propTypes = {
    message: PropTypes.string,
    color: PropTypes.string,
    fade_item: PropTypes.bool,
    size: PropTypes.number,
    height: PropTypes.number,
    width: PropTypes.number,
    sad: PropTypes.bool,
    person: PropTypes.bool,
    chatting: PropTypes.bool,
    
};

ShowMessage.defaultProps = {
    size: 30,
    height: 70,
    width: 70,
    sad: false,
    chatting: false,
    fade_item: false
};
