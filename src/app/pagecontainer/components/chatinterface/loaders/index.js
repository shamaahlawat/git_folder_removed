import React, { Component } from 'react';

export default class ChatInterfaceLoader extends Component {
    render() {
        return (
            <div className="ori-full-width ori-full-parent-height ori-bg-default ori-flex-column oriChatInterfaceContainer">
                <div className="ori-box-shadow ori-pad-15 ori-flex-row ori-flex-jfe chatHeaderContainer">
                    <p className="ori-height-xxl ori-width-70 ori-border-radius-20 ori-card-loading">&nbsp;</p>
                </div>
                <div className="ori-full-flex">&nbsp;</div>
                <div className="chatFooterContainer">
                    <div className="ori-box-shadow ori-flex-column ori-flex-jc inputContainer">
                        <p className="ori-height-xxl ori-full-width ori-card-loading">&nbsp;</p>
                    </div>
                </div>
            </div>
        );
    }
}

