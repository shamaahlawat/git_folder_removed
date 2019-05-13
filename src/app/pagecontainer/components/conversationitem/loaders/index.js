import React, { Component } from 'react';

import './index.scss';

export default class ConversationItemLoader extends Component {
    render() {
        return (
            <div className="ori-full-width ori-pad-15 ori-flex-row ori-t-border-light oriConversationItemLoaderContainer">
                <div className="ori-r-pad-10">
                    <div className="ori-card-loading avatarLoader">&nbsp;</div>
                </div>
                <div className="ori-full-flex ori-loader-line-height">
                    <p className="ori-full-width ori-height-xs ori-b-mrgn-5 ori-card-loading ">&nbsp;</p>
                    <p className="ori-full-width ori-height-xxs ori-b-mrgn-5 ori-card-loading ">&nbsp;</p>
                    <p className="ori-half-width ori-height-xxs ori-b-mrgn-5 ori-card-loading">&nbsp;</p>
                </div>
            </div>
        );
    }
}

