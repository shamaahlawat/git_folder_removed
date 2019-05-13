import React, { Component } from 'react';

export default class ConversationListLoader extends Component {
    render() {
        return (
            <div className="ori-full-width ori-full-parent-height ori-flex-column">
                <div className="ori-flex-row ori-flex-jsb ori-lr-pad-15 ori-tb-pad-20 ori-b-border-light">
                    <p className="ori-half-width ori-height-lg ori-card-loading">&nbsp;</p>
                    <p className="ori-width-lg ori-height-lg ori-card-loading">&nbsp;</p>
                </div>
                {
                    [1, 2, 3].map(i => {
                        return (
                            <div className="ori-flex-row ori-flex-jsb ori-pad-15 ori-b-border-light" key={i}>
                                <div className="ori-flex-row ori-full-flex">
                                    <p className="ori-width-md  ori-height-md ori-card-loading ori-r-mrgn-10">&nbsp;</p>
                                    <p className="ori-half-width  ori-height-md ori-card-loading">&nbsp;</p>
                                </div>
                                <p className="ori-width-md  ori-height-md ori-card-loading">&nbsp;</p>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

